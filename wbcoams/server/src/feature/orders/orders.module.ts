import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
// import { CustomersModule } from 'src/customers/customers.module';
import { CustomersModule } from '../customers/customers.module';
import { AuthModule } from 'src/core/auth/auth.module';
import { OrderRepository } from './repositors/orders-repository';
import { OrderItemRepository } from './repositors/orders-item.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, OrderItemRepository],
  imports: [CustomersModule, AuthModule],
})
export class OrdersModule {}
