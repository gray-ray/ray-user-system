import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  display_name: string;

  @ApiProperty()
  appIds: number[];
}

export class SearchUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

export class UserResponse {
  user_id: number;
  username: string;
  email: string;
  display_name: string;
  appIds: number[];
}
