import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CategoryDto) {
  @IsOptional()
  @IsBoolean({
    message: 'isActive must be a boolean value.',
  })
  isActive?: boolean;
}
