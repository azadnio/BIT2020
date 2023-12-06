import mysql from 'mysql';

export class UserModel {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  createUser(user: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.pool.query('INSERT INTO users SET ?', user, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  getUserByEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }
}
