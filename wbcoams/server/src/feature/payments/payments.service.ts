import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class PaymentsService {
  // constructor(@Inject('MYSQL_POOL') private pool: Pool) {}

  async createPayment({ order_id, amount, payment_method }) {
    // const [result] = await this.pool.execute(
    //   'INSERT INTO payments (order_id, amount, payment_method, status, payment_date) VALUES (?, ?, ?, ?, NOW())',
    //   [order_id, amount, payment_method, 'completed'],
    // );
    // return { id: (result as any).insertId };
  }

  async getPayments({ page = 1, limit = 20, status }) {
    // let sql = `SELECT * FROM payments`;
    // const params = [];
    // if (status) {
    //   sql += ` WHERE status = ?`;
    //   params.push(status);
    // }
    // sql += ` ORDER BY payment_date DESC LIMIT ? OFFSET ?`;
    // params.push(limit, (page - 1) * limit);
    // const [rows] = await this.pool.query(sql, params);
    // return rows;
  }
}
