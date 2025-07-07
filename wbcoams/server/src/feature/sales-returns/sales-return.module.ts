import { Module } from '@nestjs/common';
import { AuthModule } from 'src/core/auth/auth.module';
// import { CustomersModule } from 'src/customers/customers.module';
import { CustomersModule } from '../customers/customers.module';
import { SalesReturnService } from './sales-return.service';
import { SalesReturnController } from './sales-return.controller';
import { SalesReturnRepository } from './repositories/sales-return.repository';
import { SalesReturnItemRepository } from './repositories/sales-return-item.repository';

@Module({
  controllers: [SalesReturnController],
  providers: [SalesReturnService, SalesReturnItemRepository, SalesReturnRepository],
  imports: [AuthModule, CustomersModule],
})
export class SalesReturnModule {}
