import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  SearchPermissionDto,
} from './dto/permission';
import Permission from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const { name } = createPermissionDto;
    const existPermission = await this.permissionRepository.findOne({
      where: { name },
    });

    if (existPermission) {
      throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
    }

    const newPermission = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(newPermission);
  }

  async list() {
    const qb = this.permissionRepository.createQueryBuilder('permissions');
    const result = await qb.getMany();
    return result;
  }

  async getPage(body: any) {
    const { pageSize = 10, pageIndex = 1 } = body ?? {};
    const qb = this.permissionRepository.createQueryBuilder('permissions');

    qb.skip(pageSize * (pageIndex - 1)).take(pageSize);

    const total = await qb.getCount();
    const result = await qb.getMany();
    return { total, list: result };
  }

  async findOne(id: number) {
    const qb = this.permissionRepository.createQueryBuilder('permissions');
    qb.where('permissions.permission_id=:id').setParameter('id', id);

    const result = await qb.getOne();

    if (!result) {
      throw new HttpException('权限字符不存在', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async update(updatePermissionDto: UpdatePermissionDto) {
    const exitsPermission = await this.permissionRepository.findOne({
      where: { permission_id: updatePermissionDto?.permission_id },
    });

    if (!exitsPermission) {
      throw new HttpException('权限字符不存在', HttpStatus.BAD_REQUEST);
    }

    const newPermission = this.permissionRepository.merge(
      exitsPermission,
      updatePermissionDto,
    );

    return await this.permissionRepository.save(newPermission);
  }

  async remove(id: number) {
    const exitsPermission = await this.permissionRepository.findOne({
      where: { permission_id: id },
    });

    if (!exitsPermission) {
      throw new HttpException('权限字符不存在', HttpStatus.BAD_REQUEST);
    }
    return await this.permissionRepository.remove(exitsPermission);
  }
}
