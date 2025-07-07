import { forwardRef, Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { AuthModule } from 'src/core/auth/auth.module';
// import { UsersModule } from 'src/users/users.module';
import { UsersModule } from 'src/feature/users/users.module';
import { FileUploadModule } from 'src/common/file-upload/file-upload.mdule';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [forwardRef(() => AuthModule), UsersModule, FileUploadModule],
  providers: [CustomersService, CustomerRepository],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
