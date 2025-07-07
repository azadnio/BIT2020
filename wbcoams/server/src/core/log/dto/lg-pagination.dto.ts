import { PartialType, PickType } from '@nestjs/mapped-types';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class LogPaginationDto extends PartialType(PickType(PaginationDto, ['page', 'limit', 'from', 'to'])) {}
