import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;
}

export class SearchRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
