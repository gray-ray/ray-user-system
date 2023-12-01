import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional ,IsArray, MaxLength} from 'class-validator';

export class CreatePermissionDto {
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
}

export class SearchPermissionDto extends PartialType(CreatePermissionDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pageSize: number;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  permission_id: number;
}
