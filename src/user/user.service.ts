import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

import User from './entities/user.entity';
import Role from 'src/roles/entities/role.entity';
import Application from 'src/applications/entities/application.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async list() {
    const qb = this.userRepository.createQueryBuilder('users');
    const result = await qb.getMany();
    return result;
  }

  async getPage(body: any) {
    const { pageSize = 10, pageIndex = 1 } = body ?? {};
    const qb = this.userRepository.createQueryBuilder('users');

    qb.skip(pageSize * (pageIndex - 1)).take(pageSize);

    const total = await qb.getCount();
    const result = await qb.getMany();
    return { total, list: result };
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

    const updateUser = this.userRepository.merge(exitsUser, updateUserDto);

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
}
