import { Optional } from '@nestjs/common';
import { IOrderItem } from '@SharedRepo/interfaces/order-items.interface';
import { OrderStatus } from '@SharedRepo/enums/order-status-roles.enum';
import { IOrder } from '@SharedRepo/interfaces/order.interface';
import { ArrayNotEmpty, ArrayUnique, IsDate, IsEnum, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { ValidateIntegerField } from 'src/common/decorators/validate-inter-field.decorator';
import { ValidateStringField } from 'src/common/decorators/validate-string-field.decorator';

export class CreateOrderDto implements Partial<IOrder> {
  @ValidateIntegerField()
  customerId: number;

  @Optional()
  @IsDate()
  orderDate?: Date;

  @ValidateIntegerField()
  total: number;

  @Optional()
  @IsEnum(OrderStatus, {
    message: 'Status must be one of the following: pending, completed, cancelled, on_hold.',
  })
  status?: OrderStatus;

  @Optional()
  @ValidateStringField({
    required: false,
    maxLength: 500,
    minLength: 5,
  })
  remarks?: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ArrayUnique((item: IOrderItem) => item.itemId, {
    message: 'Each item must have a unique itemId.',
  })
  items: IOrderItem[];
}
