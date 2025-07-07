import { IsOptional, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(['pending', 'completed', 'cancelled', 'hold'], { each: true })
  status?: 'pending' | 'completed' | 'cancelled' | 'hold';

  @IsOptional()
  withItems?: boolean;

  @IsOptional()
  customerId?: number;
}
