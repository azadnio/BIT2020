import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { AuthModule } from 'src/core/auth/auth.module';
// import { CustomersModule } from 'src/customers/customers.module';
import { CustomersModule } from '../customers/customers.module';
import { InvoiceRepository } from './repositories/invoice.repository';
import { InvoiceItemRepository } from './repositories/invoice-item.repository';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository, InvoiceItemRepository],
  imports: [AuthModule, CustomersModule],
})
export class InvoiceModule {}
