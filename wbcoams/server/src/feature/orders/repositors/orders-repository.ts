import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { IOrder } from '@SharedRepo/interfaces/order.interface';
import { OrderPaginationDto } from '../dtos/order-pagination.dt';

@Injectable()
export class OrderRepository extends BaseRepository<IOrder, OrderPaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'orders';
    this.hasCreatedColumns = true;
    this.hasUpdatedColumns = true;
    this.hasSoftDelete = true;
  }

  override get genericSelectQuery(): string {
    throw new Error('genericSelectQuery is not applicable for OrderRepository');
  }

  public async selectById(orderId: number, customerId: number = null): Promise<IOrder> {
    let sql = `
        SELECT 
            orders.*,
            createdUser.name AS createdUser,
            updatedUser.name AS updatedUser
        FROM orders
        LEFT JOIN customers ON orders.customerId = customers.id
        LEFT JOIN users AS customerUser ON customers.userId = customerUser.id
        LEFT JOIN users AS createdUser ON orders.createdUserId = createdUser.id
        LEFT JOIN users AS updatedUser ON orders.updatedUserId = updatedUser.id
        WHERE orders.id = ?
        `;
    let params: number[] = [orderId];

    if (customerId) {
      sql += ' AND orders.customerId = ?';
      params.push(customerId);
    }
    const [order] = await this.db.query<IOrder[]>(sql, params);
    return order;
  }

  public async selectAll(queryParams: OrderPaginationDto): Promise<IOrder[]> {
    const { from, to, status } = queryParams;
    let sql = `
            SELECT 
                orders.*,
                createdUser.name AS createdUser,
                updatedUser.name AS updatedUser
            FROM orders
            LEFT JOIN customers ON orders.customerId = customers.id
            LEFT JOIN users AS customerUser ON customers.userId = customerUser.id
            LEFT JOIN users AS createdUser ON orders.createdUserId = createdUser.id
            LEFT JOIN users AS updatedUser ON orders.updatedUserId = updatedUser.id
            WHERE 1=1`;

    const params: any[] = [];

    if (from && to) {
      sql += ' AND orders.orderDate BETWEEN ? AND ?';
      params.push(new Date(from), new Date(to));
    } else if (from) {
      sql += ' AND orders.orderDate >= ?';
      params.push(new Date(from));
    } else if (to) {
      sql += ' AND orders.orderDate <= ?';
      params.push(new Date(to));
    }

    if (status) {
      sql += ' AND orders.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY orders.orderDate DESC';

    return await this.db.query<IOrder[]>(sql, params);
  }

  public async create(order: Partial<IOrder>): Promise<number> {
    return await this.insert(order);
  }

  public async update(id: number, order: Partial<IOrder>): Promise<boolean> {
    return await this.update(id, order);
  }

  public async delete(id: number, deletedBy: number): Promise<boolean> {
    return await this.softDelete(id, deletedBy);
  }

  public async forceDelete(id: number): Promise<boolean> {
    return await this.deletePermanently(id);
  }

  public async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T> {
    return await this.db.withMultipleTransaction(runInTransaction, isContinueTransaction);
  }

  public async getOrdersByCustomerId(customerId: number, queryParams: OrderPaginationDto): Promise<IOrder[]> {
    const { from, to, status } = queryParams;
    let sql = `
            SELECT 
                orders.*,
                customerUser.name AS customerName,
                createdUser.name AS createdUser,
                updatedUser.name AS updatedUser
            FROM orders
            LEFT JOIN customers ON orders.customerId = customers.id
            LEFT JOIN users AS customerUser ON customers.userId = customerUser.id
            LEFT JOIN users AS createdUser ON orders.createdUserId = createdUser.id
            LEFT JOIN users AS updatedUser ON orders.updatedUserId = updatedUser.id
            WHERE orders.customerId = ?
        `;
    const params: any[] = [customerId];

    if (from && to) {
      sql += ' AND orders.orderDate BETWEEN ? AND ?';
      params.push(new Date(from), new Date(to));
    } else if (from) {
      sql += ' AND orders.orderDate >= ?';
      params.push(new Date(from));
    } else if (to) {
      sql += ' AND orders.orderDate <= ?';
      params.push(new Date(to));
    }

    if (status) {
      sql += ' AND orders.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY orders.orderDate DESC';
    return await this.db.query<IOrder[]>(sql, params);
  }
}

/**
 CREATE TABLE `orders` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `customerId` INT(10) UNSIGNED NOT NULL,
    `orderDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    `total` DECIMAL(12,2) NOT NULL,
    `status` ENUM('pending','completed','cancelled','on_hold') NOT NULL DEFAULT 'pending' COLLATE 'utf8mb4_0900_ai_ci',
    `remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
    `isActive` TINYINT(1) NOT NULL DEFAULT '1',
    `createdAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    `createdUserId` INT(10) UNSIGNED NOT NULL,
    `updatedAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
    `updatedUserId` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `customerId` (`customerId`) USING BTREE,
    CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=13
;

*/
