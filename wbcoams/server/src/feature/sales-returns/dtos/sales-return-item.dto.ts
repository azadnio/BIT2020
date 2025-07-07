import { IInvoiceItem } from '@SharedRepo/interfaces/invoice-items.interface';
import { Validate } from 'class-validator';
import { ValidateIntegerField } from 'src/common/decorators/validate-inter-field.decorator';

export class SalesReturnItemDto implements Partial<IInvoiceItem> {
  salesReturnId?: number;

  @ValidateIntegerField()
  itemId: number;

  @ValidateIntegerField()
  quantity: number;

  @ValidateIntegerField()
  price: number;
}
