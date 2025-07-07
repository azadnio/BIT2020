import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { DatabaseModule } from './core/database/database.module';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { ProductsModule } from './products/products.module';
// import { OrdersModule } from './orders/orders.module';
// import { PaymentsModule } from './payments/payments.module';
// import { CustomersModule } from './customers/customers.module';
// import { ReportsModule } from './reports/reports.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { InvoiceModule } from './invoice/invoice.module';
// import { SalesReturnModule } from './sales-returns/sales-return.module';
import { LogModule } from './core/log/log.module';
import { AuthModule } from './core/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { InvoiceModule } from './feature/invoices/invoice.module';
import { OrdersModule } from './feature/orders/orders.module';
import { ProductsModule } from './feature/products/products.module';
import { SalesReturnModule } from './feature/sales-returns/sales-return.module';
import { UsersModule } from './feature/users/users.module';
import { CustomersModule } from './feature/customers/customers.module';
import { ReportsModule } from './feature/reports/reports.module';
import { ContactModule } from './feature/contact/contact.module';
import { CommonModule } from './common/common.module';
import { UploadsModule } from './feature/uploads/uploads.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'], // Load environment variables from .env file
    }),
    // Serve static files from the 'uploads' directory for file uploads (images, documents, etc.)
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      exclude: ['/api*'], // Exclude API routes from static file serving
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    CustomersModule,
    ReportsModule,
    ContactModule,
    InvoiceModule,
    SalesReturnModule,
    OrdersModule,
    LogModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
    console.log('Current working directory:', process.cwd());
  }
}
