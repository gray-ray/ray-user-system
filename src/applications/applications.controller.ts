import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

import {
  CreateApplicationDto,
  UpdateApplicationDto,
  SearchApplicationDto,
} from './dto/application.dto';
import { RolesGuard, Roles } from 'src/auth/roles.guard';
import { IsNotEmpty} from 'class-validator';

@Controller('application')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Roles('root')
  @UseGuards(RolesGuard)
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

  @Roles('root')
  @UseGuards(RolesGuard)
  @Post('update')
  update(@Body() updateUserDto: UpdateApplicationDto) {
    return this.applicationsService.update(updateUserDto);
  }

  @Get('detail')
  @IsNotEmpty()
  findOne(@Query('id') id: string) {
    return this.applicationsService.findOne(+id);
  }

  @Roles('root')
  @UseGuards(RolesGuard)
  @Get('remove')
  @IsNotEmpty()
  remove(@Query('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}
