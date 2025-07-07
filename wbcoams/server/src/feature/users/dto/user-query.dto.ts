import { Optional } from '@nestjs/common';
import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class UserQueryDto {
  @Optional()
  @IsString()
  role?: 'admin' | 'staff' | 'customer' | 'manager';
}

export class UserPaginationDto extends PartialType(IntersectionType(UserQueryDto, PaginationDto)) {}
