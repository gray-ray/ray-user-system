import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, SearchRoleDto } from './dto/role.dto';
import { RolesGuard, Roles } from 'src/auth/roles.guard';
import { IsNotEmpty} from 'class-validator';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}


  @Roles('root')
  @UseGuards(RolesGuard)
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

  @Roles('root')
  @UseGuards(RolesGuard)
  @Post('update')
  update(@Body() updateUserDto: UpdateRoleDto) {
    return this.rolesService.update(updateUserDto);
  }

  @Get('detail')
  @IsNotEmpty()
  findOne(@Query('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Roles('root')
  @UseGuards(RolesGuard)
  @Get('remove')
  @IsNotEmpty()
  remove(@Query('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
