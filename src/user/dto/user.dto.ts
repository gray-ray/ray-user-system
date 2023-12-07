import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  roleIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  display_name: string;

  @ApiProperty()
  @IsOptional()
  @IsArray({ each: true })
  appIds: number[];
}

// export class SearchUserDto extends PartialType(CreateUserDto) {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   pageIndex: number;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   pageSize: number;
// }

export class SearchUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pageSize: number;
}

export class UpdateUserDto extends CreateUserDto {
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
  appIds?: number[];
  roleIds?: number[];
}
