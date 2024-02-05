import mysql, { Pool, OkPacket } from 'mysql';
import { AppErrDatabaseError } from './apperror';

class Database {
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async executeQuery<T>(sql: string, params: any[] = []): Promise<T> {

    // const resutl = await this.pool.query(sql, params)

    // return result;

    return new Promise<T>((resolve, reject) => {
      this.pool.query(sql, params, (error, results) => {
        //catch error
        if (error) return reject(new AppErrDatabaseError(error));

        resolve(results);
      });
    });
  }
}

export const db = new Database();
