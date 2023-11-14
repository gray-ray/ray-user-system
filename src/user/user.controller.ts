import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, SearchUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Post('detail')
  findOne(@Body('id') id: string) {
    console.log(id);
    return this.userService.findOne(+id);
  }

  @Get('remove')
  remove(@Query('id') id: string) {
    return this.userService.remove(+id);
  }
}
