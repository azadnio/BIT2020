import { Optional } from '@nestjs/common';
import { IItem } from '@SharedRepo/interfaces/item.interface';
import { IsNotEmpty, IsOptional, Max, maxLength, Min, min, Validate, ValidateIf } from 'class-validator';
import { ValidateIntegerField } from 'src/common/decorators/validate-inter-field.decorator';
import { ValidateStringField } from 'src/common/decorators/validate-string-field.decorator';

export class CreateProductDto implements Partial<IItem> {
  @ValidateStringField({ maxLength: 255 })
  description: string;

  @ValidateStringField({ maxLength: 500 })
  info: string;

  @ValidateIntegerField()
  categoryId: number;

  @ValidateIntegerField({
    max: 1_000_000,
  })
  price: number;

  @ValidateIntegerField()
  brandId: number;

  @ValidateStringField({
    maxLength: 10,
    minLength: 1,
  })
  unit: string;

  @IsOptional()
  @ValidateIf((o) => {
    return o.image !== undefined;
  })
  image?: string;

  @IsOptional()
  @ValidateIntegerField({
    max: 1_000_000,
    required: false,
  })
  oldPrice?: number;
}
