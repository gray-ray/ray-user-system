import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsArray, MaxLength } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(100)
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsArray({each: true})
  roleIds: number[];

  @ApiProperty()
  @IsOptional()
  @IsArray({each: true})
  userIds: number[];
}

export class SearchApplicationDto extends PartialType(CreateApplicationDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
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
