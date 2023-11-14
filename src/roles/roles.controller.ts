import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, SearchRoleDto } from './dto/role.dto';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  create(@Body() createUserDto: CreateRoleDto) {
    return this.rolesService.create(createUserDto);
  }

  @Get('list')
  findAll() {
    return this.rolesService.list();
  }

  @Post('page')
  getPage(@Body() body: SearchRoleDto) {
    return this.rolesService.getPage(body);
  }

  @Post('update')
  update(@Body() updateUserDto: UpdateRoleDto) {
    return this.rolesService.update(updateUserDto);
  }

  @Post('detail')
  findOne(@Body('id') id: string) {
    console.log(id);
    return this.rolesService.findOne(+id);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
