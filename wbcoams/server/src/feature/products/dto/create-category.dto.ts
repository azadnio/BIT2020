import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Max, Min, min, Validate } from 'class-validator';
import { ValidateStringField } from 'src/common/decorators/validate-string-field.decorator';
import { CapitalizePipe } from 'src/common/pipes/capitalize.pipe';
import { ICategory } from '@SharedRepo/interfaces/category.interface';

export class CategoryDto implements Partial<ICategory> {
  @ValidateStringField({
    capitalized: true,
  })
  name: string;
}
