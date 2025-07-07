import { Optional } from '@nestjs/common';
import { IInvoice } from '@SharedRepo/interfaces/invoice.interface';
import { ArrayNotEmpty, ArrayUnique, IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { ValidateIntegerField } from 'src/common/decorators/validate-inter-field.decorator';
import { ValidateStringField } from 'src/common/decorators/validate-string-field.decorator';
import { InvoiceItemDto } from './invoice-item.dto';

export class CereateInvoiceDto implements Partial<IInvoice> {
  @ValidateIntegerField()
  customerId: number;

  @Optional()
  @IsDate()
  invoiceDate?: Date;

  @ValidateIntegerField({
    required: false,
  })
  subTotal?: number;

  @ValidateIntegerField({
    required: false,
  })
  discount?: number;

  @ValidateIntegerField({
    required: false,
  })
  total?: number;

  @Optional()
  @IsDate()
  dueDate?: Date;

  @Optional()
  @ValidateStringField({
    required: false,
    maxLength: 500,
    minLength: 5,
  })
  remarks?: string;

  @Optional()
  @IsEnum(['draft', 'finalized', 'paid', 'cancelled'], {
    message: 'Status must be one of the following: draft, finalized, paid, cancelled.',
  })
  status?: 'draft' | 'finalized' | 'paid' | 'cancelled';

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ArrayUnique((item: InvoiceItemDto) => item.itemId, {
    message: 'Each item must have a unique itemId.',
  })
  items: InvoiceItemDto[];
}
