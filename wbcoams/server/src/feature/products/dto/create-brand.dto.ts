import { ValidateStringField } from 'src/common/decorators/validate-string-field.decorator';
import { CategoryDto } from './create-category.dto';
import { IBrand } from '@SharedRepo/interfaces/brand.interface';
import { IsOptional } from 'class-validator';

export class BrandDto implements Partial<IBrand> {
  @ValidateStringField({
    capitalized: true,
  })
  name: string;

  @IsOptional()
  @ValidateStringField({
    capitalized: true,
    maxLength: 100,
  })
  logo?: string;
}
