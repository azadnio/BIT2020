import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class SalesReturnPaginationDto extends PaginationDto {
  @IsOptional()
  withItems?: boolean;

  @IsOptional()
  customerId?: number;
}
