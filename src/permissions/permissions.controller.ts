import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  SearchPermissionDto,
} from './dto/permission';

import { RolesGuard, Roles } from 'src/auth/roles.guard';
import { IsNotEmpty} from 'class-validator';
@Controller('permission')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Roles('root')
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get('list')
  findAll() {
    return this.permissionsService.list();
  }

  @Post('page')
  getPage(@Body() body: SearchPermissionDto) {
    return this.permissionsService.getPage(body);
  }

  @Roles('root')
  @UseGuards(RolesGuard)
  @Post('update')
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(updatePermissionDto);
  }

  @Get('detail')
  @IsNotEmpty()
  findOne(@Query('id') id: string) {
    console.log(id);
    return this.permissionsService.findOne(+id);
  }

  @Roles('root')
  @UseGuards(RolesGuard)
  @Get('remove')
  @IsNotEmpty()
  remove(@Query('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
