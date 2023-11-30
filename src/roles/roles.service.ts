import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import Role from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { PermissionsService } from 'src/permissions/permissions.service';
import { ApplicationsService } from 'src/applications/applications.service';
import Permission from 'src/permissions/entities/permission.entity';
import Application from 'src/applications/entities/application.entity';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly permissionsService: PermissionsService,
    @Inject(forwardRef(() => ApplicationsService))
    private applicationsService: ApplicationsService,
  ) {}

  async getSubmitDto(data: CreateRoleDto | UpdateRoleDto) {
    const { permissionIds = [], appIds = [], ...reset } = data;

    let applications: Application[] = [];
    let permissions: Permission[] = [];

    if (permissionIds?.length > 0) {
      permissions = await this.permissionsService.findByIds(permissionIds);
    }

    if (appIds?.length > 0) {
      applications = await this.applicationsService.findByIds(appIds);
    }

    const param = {
      ...reset,
      permissions,
      applications,
    };
    return param;
  }

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const existRole = await this.roleRepository.findOne({
      where: { name },
    });

    if (existRole) {
      throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
    }

    const param = await this.getSubmitDto(createRoleDto);

    const newRole = this.roleRepository.create(param);
    return await this.roleRepository.save(newRole);
  }

  async list() {
    const qb = this.roleRepository.createQueryBuilder('roles');
    qb.leftJoinAndSelect('roles.applications', 'applications');
    qb.leftJoinAndSelect('roles.permissions', 'permissions');

    const result = await qb.getMany();
    const list = result.map((item) => item.responseObject());
    return list;
  }

  async getPage(body: any) {
    const { pageSize = 10, pageIndex = 1 } = body ?? {};
    const qb = this.roleRepository.createQueryBuilder('roles');

    qb.leftJoinAndSelect('roles.applications', 'applications');
    qb.leftJoinAndSelect('roles.permissions', 'permissions');

    qb.skip(pageSize * (pageIndex - 1)).take(pageSize);

    const total = await qb.getCount();
    const result = await qb.getMany();
    const list = result.map((item) => item.responseObject());
    return { total, list };
  }

  async findOne(id: number) {
    const qb = this.roleRepository.createQueryBuilder('roles');
    qb.where('roles.role_id=:id').setParameter('id', id);

    const result = await qb.getOne();

    if (!result) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async update(updateRoleDto: UpdateRoleDto) {
    const exitsRole = await this.roleRepository.findOne({
      where: { role_id: updateRoleDto?.role_id },
    });

    if (!exitsRole) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    const param = await this.getSubmitDto(updateRoleDto);

    const newRole = this.roleRepository.merge(exitsRole, param);

    return await this.roleRepository.save(newRole);
  }

  async remove(id: number) {
    const exitsRole = await this.roleRepository.findOne({
      where: { role_id: id },
    });

    if (!exitsRole) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    return await this.roleRepository.remove(exitsRole);
  }

  async findByIds(ids: number[]) {
    return this.roleRepository.findBy({ role_id: In(ids) });
  }
}
