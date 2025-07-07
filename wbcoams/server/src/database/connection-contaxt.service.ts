// database/connection-context.service.ts
import { Inject, Injectable, Scope } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { MYSQL_POOL } from 'src/common/constants/database.constant';

@Injectable({ scope: Scope.REQUEST })
export class ConnectionContextService {
  private connection: mysql.PoolConnection;

  constructor(@Inject(MYSQL_POOL) private readonly pool: mysql.Pool) {}

  setConnection(conn: mysql.PoolConnection) {
    this.connection = conn;
  }

  async getConnection(): Promise<mysql.PoolConnection> {
    if (this.connection) {
      return this.connection; // shared transactional connection
    }
    return this.pool.getConnection(); // fallback for non-transactional use
  }

  // optional cleanup if needed
  releaseConnection() {
    if (this.connection) {
      this.connection.release();
      this.connection = null;
    }
  }
}
