import { IsOptional, IsNumber, Min, Max, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { IsDateRangeValid } from '../decorators/validate-daterange.decorator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsBoolean()
  includeDeleted?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsDateRangeValid({
    message: 'To date must be greater than or equal to From date',
  })
  from?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsDateRangeValid({
    message: 'To date must be greater than or equal to From date',
  })
  to?: Date;
}
