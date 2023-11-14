import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Application from './entities/application.entity';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly ApplicationRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const { name } = createApplicationDto;
    const existApplication = await this.ApplicationRepository.findOne({
      where: { name },
    });

    if (existApplication) {
      throw new HttpException('角色已存在', HttpStatus.BAD_REQUEST);
    }

    const newApplication =
      this.ApplicationRepository.create(createApplicationDto);
    return await this.ApplicationRepository.save(newApplication);
  }

  async list() {
    const qb = this.ApplicationRepository.createQueryBuilder('applications');
    const result = await qb.getMany();
    return result;
  }

  async getPage(body: any) {
    const { pageSize = 10, pageIndex = 1 } = body ?? {};
    const qb = this.ApplicationRepository.createQueryBuilder('applications');

    qb.skip(pageSize * (pageIndex - 1)).take(pageSize);

    const total = await qb.getCount();
    const result = await qb.getMany();
    return { total, list: result };
  }

  async findOne(id: number) {
    const qb = this.ApplicationRepository.createQueryBuilder('applications');
    qb.where('Applications.app_id=:id').setParameter('id', id);

    const result = await qb.getOne();

    if (!result) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  async update(updateApplicationDto: UpdateApplicationDto) {
    const exitsApplication = await this.ApplicationRepository.findOne({
      where: { app_id: updateApplicationDto?.app_id },
    });

    if (!exitsApplication) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    const newApplication = this.ApplicationRepository.merge(
      exitsApplication,
      updateApplicationDto,
    );

    return await this.ApplicationRepository.save(newApplication);
  }

  async remove(id: number) {
    const exitsApplication = await this.ApplicationRepository.findOne({
      where: { app_id: id },
    });

    if (!exitsApplication) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    return await this.ApplicationRepository.remove(exitsApplication);
  }
}
