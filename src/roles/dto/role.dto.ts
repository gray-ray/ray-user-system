import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsArray , MaxLength} from 'class-validator';

export class CreateRoleDto {
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
  permissionIds: number[];

  @ApiProperty()
  @IsOptional()
  @IsArray({each: true})
  appIds: number[];
}

export class SearchRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pageIndex: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pageSize: number;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}

export class RoleResponse {
  role_id: number;
  name: string;
  description: string;
  permissionIds: number[];
  appIds: number[];
}
