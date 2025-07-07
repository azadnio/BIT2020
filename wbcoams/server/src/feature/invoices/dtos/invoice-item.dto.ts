import { IInvoiceItem } from '@SharedRepo/interfaces/invoice-items.interface';
import { ValidateIntegerField } from 'src/common/decorators/validate-inter-field.decorator';

export class InvoiceItemDto implements Partial<IInvoiceItem> {
  invoiceId?: number;

  @ValidateIntegerField()
  quantity: number;

  @ValidateIntegerField()
  price: number;

  @ValidateIntegerField()
  itemId: number;
}
