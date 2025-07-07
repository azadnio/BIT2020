import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MatchUserIdGuard } from './guards/user-id.guard';
import { RequestContextService } from './request-context.service';

// import { UsersModule } from '../users/users.module';
// import { CustomersModule } from 'src/customers/customers.module';
import { UsersModule } from '../../feature/users/users.module';
import { CustomersModule } from '../../feature/customers/customers.module';

@Global()
@Module({
  imports: [
    UsersModule,
    CustomersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard, JwtAuthGuard, MatchUserIdGuard, JwtService, RequestContextService],
  exports: [AuthService, RolesGuard, JwtAuthGuard, JwtService, MatchUserIdGuard, RequestContextService],
})
export class AuthModule {}
