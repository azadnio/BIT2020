import { Optional } from '@nestjs/common';
import { IInvoice } from '@SharedRepo/interfaces/invoice.interface';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { ValidateIntegerField } from 'src/common/decorators/validate-inter-field.decorator';
import { ValidateStringField } from 'src/common/decorators/validate-string-field.decorator';
import { SalesReturnItemDto } from './sales-return-item.dto';
import { ISalesReturn } from '@SharedRepo/interfaces/sales-return.interface';
import { ISalesReturnItem } from '@SharedRepo/interfaces/sales-return-tems.interface';

export class CreateSalesReturnDto implements Partial<ISalesReturn> {
  @ValidateIntegerField()
  customerId: number;

  @IsNotEmpty()
  @IsDate()
  returnDate?: Date;

  @ValidateIntegerField()
  total: number;

  @Optional()
  @ValidateStringField({
    required: false,
    maxLength: 500,
    minLength: 5,
  })
  remarks?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique((item: ISalesReturnItem) => item.itemId)
  items: ISalesReturnItem[];
}
