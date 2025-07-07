import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/core/auth/auth.module';
import { FileUploadModule } from 'src/common/file-upload/file-upload.mdule';
import { UserRepository } from './user.repository';

@Module({
  imports: [forwardRef(() => AuthModule), FileUploadModule],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
