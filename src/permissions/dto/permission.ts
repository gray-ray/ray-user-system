import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;
}

export class SearchPermissionDto extends PartialType(CreatePermissionDto) {
  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  permission_id: number;
}
