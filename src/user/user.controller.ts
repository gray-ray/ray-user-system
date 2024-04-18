import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, SearchUserDto } from './dto/user.dto';

import { IsNotEmpty } from 'class-validator';

import { RolesGuard, Roles } from 'src/auth/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Roles('root')
  // @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  findAll() {
    return this.userService.list();
  }

  @Post('page')
  getPage(@Body() body: SearchUserDto) {
    return this.userService.getPage(body);
  }

  @Roles('root')
  @UseGuards(RolesGuard)
  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Get('detail')
  @IsNotEmpty()
  findOne(@Query('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Roles('root')
  @UseGuards(RolesGuard)
  @Get('remove')
  @IsNotEmpty()
  remove(@Query('id') id: string) {
    return this.userService.remove(+id);
  }
}
