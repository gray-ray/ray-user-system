import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  roleIds: number[];

  @ApiProperty()
  userIds: number[];
}

export class SearchApplicationDto extends PartialType(CreateApplicationDto) {
  @ApiProperty()
  pageIndex: number;

  @ApiProperty()
  pageSize: number;
}

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  app_id: number;
}

export class AppResponse {
  app_id: number;
  name: string;
  description: string;
  roleIds: number[];
  userIds: number[];
}
