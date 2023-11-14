import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Role from './entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const existRole = await this.roleRepository.findOne({
      where: { name },
    });

    if (existRole) {
      throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
    }

    const newRole = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(newRole);
  }

  async list() {
    const qb = this.roleRepository.createQueryBuilder('roles');
    const result = await qb.getMany();
    return result;
  }

  async getPage(body: any) {
    const { pageSize = 10, pageIndex = 1 } = body ?? {};
    const qb = this.roleRepository.createQueryBuilder('roles');

    qb.skip(pageSize * (pageIndex - 1)).take(pageSize);

    const total = await qb.getCount();
    const result = await qb.getMany();
    return { total, list: result };
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

    const newRole = this.roleRepository.merge(exitsRole, updateRoleDto);

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
}
