import { IsBoolean, IsOptional } from 'class-validator';

export class DeleteQueryDto {
  @IsOptional()
  @IsBoolean()
  softDelete?: boolean;

  @IsOptional()
  @IsBoolean()
  forceDelete?: boolean;
}
