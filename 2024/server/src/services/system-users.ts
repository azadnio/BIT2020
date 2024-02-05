// import { getConnection } from '../db/mysqlConnection';
// import { User } from '../models/user';
import IUser from '@intefaces/user'

export class UserService {
  // Create a new user
  createUser(user: IUser): Promise<number> {
    return new Promise((resolve, reject) => {
      const connection = getConnection();
      connection.query('INSERT INTO users SET ?', user, (error, results) => {
        connection.release();

        if (error) {
          console.error('Error creating user:', error);
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }

  // Get a user by ID
  getUserById(id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const connection = getConnection();
      connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        connection.release();

        if (error) {
          console.error('Error getting user by ID:', error);
          reject(error);
        } else {
          resolve(results.length ? results[0] : null);
        }
      });
    });
  }

  // Update a user
  updateUser(id: number, updatedUser: User): Promise<void> {
    return new Promise((resolve, reject) => {
      const connection = getConnection();
      connection.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], (error) => {
        connection.release();

        if (error) {
          console.error('Error updating user:', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  // Delete a user
  deleteUser(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const connection = getConnection();
      connection.query('DELETE FROM users WHERE id = ?', [id], (error) => {
        connection.release();

        if (error) {
          console.error('Error deleting user:', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
