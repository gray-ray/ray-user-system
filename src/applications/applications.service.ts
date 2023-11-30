import {
  Injectable,
  HttpException,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import Application from './entities/application.entity';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';
import { UserService } from 'src/user/user.service';
import { RolesService } from 'src/roles/roles.service';
import User from 'src/user/entities/user.entity';
import Role from 'src/roles/entities/role.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly rolesService: RolesService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async getSubmitDto(data: CreateApplicationDto | UpdateApplicationDto) {
    const { userIds = [], roleIds = [], ...reset } = data;

    let users: User[] = [];
    let roles: Role[] = [];

    if (roleIds?.length > 0) {
      roles = await this.rolesService.findByIds(roleIds);
    }

    if (userIds?.length > 0) {
      users = await this.userService.findByIds(userIds);
    }

    const param = {
      ...reset,
      roles,
      users,
    };
    return param;
  }

  async create(createApplicationDto: CreateApplicationDto) {
    const { name } = createApplicationDto;
    const existApplication = await this.applicationRepository.findOne({
      where: { name },
    });

    if (existApplication) {
      throw new HttpException('应用已存在', HttpStatus.BAD_REQUEST);
    }

    const param = await this.getSubmitDto(createApplicationDto);

    const newApplication = this.applicationRepository.create(param);
    return await this.applicationRepository.save(newApplication);
  }

  async list() {
    const qb = this.applicationRepository.createQueryBuilder('applications');
    qb.leftJoinAndSelect('applications.users', 'users');
    qb.leftJoinAndSelect('applications.roles', 'roles');

    const result = await qb.getMany();
    const list = result.map((item) => item.responseObject());
    return list;
  }

  async getPage(body: any) {
    const { pageSize = 10, pageIndex = 1 } = body ?? {};
    const qb = this.applicationRepository.createQueryBuilder('applications');
    qb.leftJoinAndSelect('applications.users', 'users');
    qb.leftJoinAndSelect('applications.roles', 'roles');

    qb.skip(pageSize * (pageIndex - 1)).take(pageSize);

    const total = await qb.getCount();
    const result = await qb.getMany();
    const list = result.map((item) => item.responseObject());
    return { total, list };
  }

  async findOne(id: number) {
    const qb = this.applicationRepository.createQueryBuilder('applications');
    qb.where('Applications.app_id=:id').setParameter('id', id);

    const result = await qb.getOne();

    if (!result) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async update(updateApplicationDto: UpdateApplicationDto) {
    const exitsApplication = await this.applicationRepository.findOne({
      where: { app_id: updateApplicationDto?.app_id },
    });

    if (!exitsApplication) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    const param = await this.getSubmitDto(updateApplicationDto);

    const newApplication = this.applicationRepository.merge(
      exitsApplication,
      param,
    );

    return await this.applicationRepository.save(newApplication);
  }

  async remove(id: number) {
    const exitsApplication = await this.applicationRepository.findOne({
      where: { app_id: id },
    });

    if (!exitsApplication) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    return await this.applicationRepository.remove(exitsApplication);
  }

  async findByIds(ids: number[]) {
    return this.applicationRepository.findBy({ app_id: In(ids) });
  }
}
