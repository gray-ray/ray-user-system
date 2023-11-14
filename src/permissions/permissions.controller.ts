import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  SearchPermissionDto,
} from './dto/permission';

@Controller('permission')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

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

  @Post('update')
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(updatePermissionDto);
  }

  @Post('detail')
  findOne(@Body('id') id: string) {
    console.log(id);
    return this.permissionsService.findOne(+id);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
