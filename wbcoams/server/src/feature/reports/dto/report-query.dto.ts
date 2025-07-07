import { IsOptional, IsString, IsDateString } from 'class-validator';

export class ReportQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}

export class CustomerSpecificReportQueryDto extends ReportQueryDto {
  @IsString()
  customerId: string;
}
