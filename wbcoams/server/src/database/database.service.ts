import { Injectable } from '@nestjs/common';
import { PoolConnection } from 'mysql2/promise';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { ConnectionContextService } from './connection-contaxt.service';

@Injectable()
export class DatabaseService implements IDatabaseService {
  constructor(private context: ConnectionContextService) {}

  async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean = false
  ): Promise<T> {
    //this function is used to run a block of code within a transaction.
    // If isContinueTransaction is true, it will continue using the existing transaction connection.
    // Otherwise, it will start a new transaction.
    // This is useful for nested transactions
    const conn = await this.context.getConnection();
    if (isContinueTransaction) {
      return await this.continueTransaction(runInTransaction);
    }

    try {
      await conn.beginTransaction();
      this.context.setConnection(conn);
      const result = await this.continueTransaction(runInTransaction);
      await conn.commit();
      return result;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      this.context.releaseConnection();
    }
  }

  private async continueTransaction<T>(runInTransaction: () => Promise<T>): Promise<T> {
    const result = await runInTransaction();
    return result;
  }

  // Run a SQL query and return the result
  async query<T = any>(sql: string, params?: any[]): Promise<T> {
    const conn = await this.context.getConnection();
    const [rows] = await conn.query(sql, params);
    return rows as T;
  }

  // Run a SQL statement (like INSERT, UPDATE, DELETE)
  async execute(sql: string, params?: any[]): Promise<any> {
    const conn = await this.context.getConnection();
    const [result] = await conn.execute(sql, params);
    return result;
  }
}
