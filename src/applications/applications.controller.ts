import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

import {
  CreateApplicationDto,
  UpdateApplicationDto,
  SearchApplicationDto,
} from './dto/application.dto';

@Controller('application')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post('create')
  create(@Body() createUserDto: CreateApplicationDto) {
    return this.applicationsService.create(createUserDto);
  }

  @Get('list')
  findAll() {
    return this.applicationsService.list();
  }

  @Post('page')
  getPage(@Body() body: SearchApplicationDto) {
    return this.applicationsService.getPage(body);
  }

  @Post('update')
  update(@Body() updateUserDto: UpdateApplicationDto) {
    return this.applicationsService.update(updateUserDto);
  }

  @Post('detail')
  findOne(@Body('id') id: string) {
    console.log(id);
    return this.applicationsService.findOne(+id);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}
