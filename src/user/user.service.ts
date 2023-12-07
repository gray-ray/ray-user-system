import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

import Role from 'src/roles/entities/role.entity';
import User from './entities/user.entity';
import Application from 'src/applications/entities/application.entity';

import { RolesService } from 'src/roles/roles.service';
import { ApplicationsService } from 'src/applications/applications.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly applicationsService: ApplicationsService,
    @Inject(forwardRef(() => RolesService))
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {
      username,
      password,
      email,
      display_name,
      roleIds = [],
      appIds = [],
    } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    let apps: Application[];
    if (appIds?.length > 0) {
      apps = await this.applicationsService.findByIds(appIds);
    }

    let roles: Role[];
    if (roleIds?.length > 0) {
      roles = await this.rolesService.findByIds(roleIds);
    }

    const param = {
      apps,
      roles,
      password,
      email,
      display_name,
      username,
    };
    const newUser = this.userRepository.create(param);
    return await this.userRepository.save(newUser);
  }

  async list() {
    const qb = this.userRepository.createQueryBuilder('users');
    qb.leftJoinAndSelect('users.apps', 'apps');
    qb.leftJoinAndSelect('users.roles', 'roles');
    const result = await qb.getMany();
    const list = result.map((item) => item.responseObject());
    return list;
  }

  async getPage(body: any) {
    const { pageSize = 10, pageIndex = 1 } = body ?? {};
    const qb = this.userRepository.createQueryBuilder('users');
    qb.leftJoinAndSelect('users.apps', 'apps');
    qb.leftJoinAndSelect('users.roles', 'roles');
    qb.skip(pageSize * (pageIndex - 1)).take(pageSize);

    const total = await qb.getCount();
    const result = await qb.getMany();
    const list = result.map((item) => item.responseObject());
    return { total, list };
  }

  async findOne(id: number) {
    const qb = this.userRepository.createQueryBuilder('users');
    qb.where('users.user_id=:id').setParameter('id', id);

    const result = await qb.getOne();

    if (!result) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async update(updateUserDto: UpdateUserDto) {
    const exitsUser = await this.userRepository.findOne({
      where: { user_id: updateUserDto?.user_id },
    });

    if (!exitsUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    const { appIds = [], ...reset } = updateUserDto;

    let apps: Application[] = [];

    if (appIds?.length > 0) {
      apps = await this.applicationsService.findByIds(appIds);
    }

    const param = {
      ...reset,
      apps,
    };

    const updateUser = this.userRepository.merge(exitsUser, param);

    return await this.userRepository.save(updateUser);
  }

  async remove(id: number) {
    const exitsUser = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (!exitsUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.remove(exitsUser);
  }

  async findByIds(ids: number[]) {
    return this.userRepository.findBy({ user_id: In(ids) });
  }

  async findByName(username: string) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      // password 返回返回column隐藏时可以通过 addSelect  添加查询
      .addSelect('users.password')
      .leftJoinAndSelect('users.roles', 'roles')
      .where('users.username = :username', { username })
      .getOne();

    return user;
  }
}
