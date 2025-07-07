import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class InvoicePaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(['draft', 'finalized', 'paid', 'cancelled'], { each: true })
  status?: 'draft' | 'finalized' | 'paid' | 'cancelled';

  @IsOptional()
  withItems?: boolean;

  @IsOptional()
  customerId?: number;
}
