import { Injectable, BadRequestException } from '@nestjs/common';
import { IOrder } from '@SharedRepo/interfaces/order.interface';
import { PoolConnection } from 'mysql2/promise';
import { ExtendedRequest } from 'src/common/types/extended-request.type';
// import { CustomersService } from 'src/customers/customers.service';
import { CustomersService } from '../customers/customers.service';
import { OrderPaginationDto } from './dtos/order-pagination.dt';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderStatus } from '@SharedRepo/enums/order-status-roles.enum';
import { OrderRepository } from './repositors/orders-repository';
import { OrderItemRepository } from './repositors/orders-item.repository';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { LogService } from 'src/core/log/log.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly context: RequestContextService,
    private readonly logService: LogService
  ) {}

  async createOrder(order: CreateOrderDto) {
    this.additionalOrderValidation(order as IOrder);

    const createdOrder = await this.orderRepository.withMultipleTransaction(async () => {
      const customerCreditInfo = await this.customerService.getCustomerCreditInfo(order.customerId);
      if (+customerCreditInfo.creditLimit < order.total + +customerCreditInfo.creditBalance) {
        throw new BadRequestException('Customer credit limit exceeded. Cannot create order.');
      }

      const { items, ...orderData } = order;
      (orderData as IOrder).createdUserId = this.context.userId;
      (orderData as IOrder).updatedUserId = this.context.userId;

      const orderId = await this.orderRepository.create(orderData as IOrder);
      await this.orderItemRepository.insertOrderItems(orderId, items);

      return await this.orderRepository.selectById(orderId);
    }, true);

    this.logService.creation(
      createdOrder.id,
      `Order created with ID: ${createdOrder.id} by user: ${this.context.userId}`
    );
    return createdOrder;
  }

  private async getCustomerOrders(customerId: number, query: OrderPaginationDto) {
    const { withItems, from, to } = query;
    if (from && to && new Date(from) > new Date(to)) {
      throw new Error('Invalid date range: "from" date cannot be after "to" date.');
    }

    return await this.orderRepository.withMultipleTransaction(async () => {
      const orders = await this.orderRepository.getOrdersByCustomerId(customerId, query);
      if (withItems) {
        return this.appendOrderItems(orders);
      }
      return orders;
    }, true);
  }

  async getAllOrders(query: OrderPaginationDto) {
    if (this.context.isCustomer()) {
      return await this.getCustomerOrders(this.context.customerId, query);
    }

    const { withItems, from, to } = query;
    if (from && to && new Date(from) > new Date(to)) {
      throw new Error('Invalid date range: "from" date cannot be after "to" date.');
    }

    return await this.orderRepository.withMultipleTransaction(async () => {
      const orders = await this.orderRepository.selectAll(query);
      if (withItems) {
        return this.appendOrderItems(orders);
      }
      return orders;
    }, true);
  }

  async updateOrder(id: number, order: UpdateOrderDto) {
    this.additionalOrderValidation(order as IOrder);

    // Validate order existence
    const existingOrder = await this.getOrderById(id);
    if (!existingOrder) {
      throw new BadRequestException('Order not found.');
    }

    if (!this.context.isCustomer()) {
      throw new BadRequestException('Only customers can update orders.');
    }
    if (order.customerId !== this.context.customerId) {
      throw new BadRequestException('You can only update your own orders.');
    }
    if (existingOrder.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be updated.');
    }

    const updatedOrder = await this.orderRepository.withMultipleTransaction(async () => {
      const { items, ...orderData } = order;
      const isUpdated = await this.orderRepository.update(id, orderData as IOrder);
      if (!isUpdated) {
        throw new BadRequestException('Failed to update order.');
      }

      // Delete existing items first
      await this.orderItemRepository.deleteOrderItems(id);
      // Insert new items
      await this.orderItemRepository.insertOrderItems(id, items);

      return await this.getOrderById(id);
    }, true);

    this.logService.updation(
      id,
      `Order updated with ID: ${id} by user: ${this.context.userId}:
       ${Object.keys(order).join(', ')} , items count: ${updatedOrder.items.length}`
    );
    return updatedOrder;
  }

  async deleteOrder(id: number, req: ExtendedRequest, connection?: PoolConnection) {
    if (!this.context.isCustomer() && !this.context.isAdmin()) {
      throw new BadRequestException('Only customers or admins can delete orders.');
    }

    const deleteOrder = await this.orderRepository.selectById(id);
    if (!deleteOrder) {
      throw new BadRequestException('Order not found.');
    }
    if (deleteOrder.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be deleted.');
    }
    if (this.context.customerId !== deleteOrder.customerId) {
      throw new BadRequestException('You can only delete orders created by you.');
    }

    const isDeleted = await this.orderRepository.withMultipleTransaction(async () => {
      await this.orderRepository.delete(id, this.context.userId);
      await this.orderItemRepository.deleteOrderItems(id);
      return true;
    }, true);

    this.logService.deletion(id, `Order deleted with ID: ${id} by user: ${this.context.userId}`);
    this.logService.saveImportantLogToFile(
      `Order deleted with ID: ${id} by user: ${this.context.userId} \n ${JSON.stringify(deleteOrder)}`,
      'delete-order.log'
    );
    return { deleted: true, id };
  }

  async getOrderById(orderId: number) {
    const order = await this.orderRepository.selectById(orderId, this.context.customerId);
    if (!order) {
      throw new BadRequestException(`Order with ID ${orderId} not found.`);
    }
    return order;
  }

  private async appendOrderItems(order: IOrder | IOrder[]): Promise<IOrder | IOrder[]> {
    if (Array.isArray(order)) {
      for (const ord of order) {
        ord.items = await this.orderItemRepository.getOrderItems(ord.id);
      }
      return order;
    }
    order.items = await this.orderItemRepository.getOrderItems(order.id);
    return order;
  }

  private additionalOrderValidation(order: IOrder): boolean {
    if (order.items.length === 0) {
      throw new BadRequestException('Order must have at least one item.');
    }

    if (order.items.some((item) => item.quantity <= 0 || item.price <= 0)) {
      throw new BadRequestException('Item quantity and price must be greater than zero.');
    }

    const total = order.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    if (order.total !== total) {
      throw new BadRequestException('Total does not match the sum of item prices.');
    }

    return true;
  }
}

/**
 * CREATE TABLE orders (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customerId INT UNSIGNED NOT NULL,
    orderDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(12,2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled', 'hold') NOT NULL DEFAULT 'pending',
    remarks VARCHAR(255),
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdUserId INT UNSIGNED NOT NULL,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updatedUserId INT UNSIGNED NOT NULL,
    FOREIGN KEY (customerId) REFERENCES customers(id)
);


CREATE TABLE order_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    orderId INT UNSIGNED NOT NULL,
    itemId INT UNSIGNED NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (itemId) REFERENCES products(id)
);
 */
