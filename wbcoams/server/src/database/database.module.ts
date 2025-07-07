import { Module, Global } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { DATABASE_SERVICE, MYSQL_POOL } from 'src/common/constants/database.constant';
import { ConnectionContextService } from './connection-contaxt.service';

// Make this module global so it can be used throughout the app
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      // Provide a MySQL connection pool using the token 'MYSQL_POOL'
      provide: MYSQL_POOL,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<Pool> => {
        // Create and return a MySQL connection pool
        return createPool({
          host: configService.get<string>('DB_HOST'),
          user: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          waitForConnections: true,
          connectionLimit: 10,
        });
      },
    },
    {
      provide: DATABASE_SERVICE,
      useClass: DatabaseService,
    },
    ConnectionContextService,
  ],
  // Export the connection pool so it can be injected elsewhere
  exports: [MYSQL_POOL, DATABASE_SERVICE, ConnectionContextService],
})
export class DatabaseModule {}
