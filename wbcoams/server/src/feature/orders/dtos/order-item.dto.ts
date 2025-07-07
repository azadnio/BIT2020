import { IOrderItem } from '@SharedRepo/interfaces/order-items.interface';
import { ValidateIntegerField } from 'src/common/decorators/validate-inter-field.decorator';

export class OrderItemDto implements Partial<IOrderItem> {
  orderId?: number;

  @ValidateIntegerField()
  quantity: number;

  @ValidateIntegerField()
  price: number;

  @ValidateIntegerField()
  itemId: number;
}
