import { Inject, Injectable } from '@nestjs/common';
import { IInvoiceItem } from '@SharedRepo/interfaces/invoice-items.interface';
import { IOrderItem } from '@SharedRepo/interfaces/order-items.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';

@Injectable()
export class OrderItemRepository extends BaseRepository<IOrderItem, PaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'order_items';
    this.hasCreatedColumns = false;
    this.hasUpdatedColumns = false;
    this.hasSoftDelete = false;
  }

  public async getOrderItems(orderId: number) {
    const sql = `
            SELECT 
                oi.*, 
                p.description, 
                p.categoryId, 
                c.name AS categoryName, 
                p.brandId, 
                b.name AS brandName, 
                p.image, 
                p.unit
            FROM order_items oi
            LEFT JOIN products p ON oi.itemId = p.id
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN brands b ON p.brandId = b.id
            WHERE oi.orderId = ?
        `;
    const rows = await this.db.query<IOrderItem[]>(sql, [orderId]);
    return Array.isArray(rows) ? rows : [];
  }

  public async insertOrderItems(orderId: number, items: IOrderItem[]): Promise<boolean> {
    const sql = `
            INSERT INTO order_items (orderId, itemId, quantity, price)
            VALUES ?
        `;
    const values = items.map((item) => [orderId, item.itemId, item.quantity, item.price]);
    const result = await this.db.query(sql, [values]);
    return result.affectedRows > 0;
  }

  public async deleteOrderItems(orderId: number): Promise<boolean> {
    const sql = `
            DELETE FROM order_items
            WHERE orderId = ?
        `;
    const result = await this.db.query(sql, [orderId]);
    return result.affectedRows > 0;
  }

  override get genericSelectQuery(): string {
    // No need for a generic select query as this repository is specialized
    throw new Error('Generic select query is not applicable for InvoiceItemRepository');
  }

  // Implementing the abstract methods from BaseRepository
  // These methods will throw errors as this repository is not meant to be used directly.
  protected async selectById(_: number): Promise<IInvoiceItem> {
    throw new Error('cannot find invoice item by ID');
  }

  protected async selectAll(_: IPagination): Promise<IInvoiceItem[]> {
    throw new Error('cannot find all invoice items');
  }

  protected async create(_: Partial<IInvoiceItem>): Promise<number> {
    throw new Error('cannot create invoice item');
  }

  protected async update(_: number, __: Partial<IInvoiceItem>): Promise<boolean> {
    throw new Error('cannot update invoice item');
  }

  protected async delete(_: number, __: number): Promise<boolean> {
    throw new Error('cannot delete invoice item');
  }

  protected withMultipleTransaction<T>(_: () => Promise<T>, __: boolean): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

/**
CREATE TABLE `order_items` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`orderId` INT(10) UNSIGNED NOT NULL,
	`itemId` INT(10) UNSIGNED NOT NULL,
	`quantity` INT(10) NOT NULL DEFAULT '1',
	`price` DECIMAL(12,2) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `orderId` (`orderId`) USING BTREE,
	INDEX `itemId` (`itemId`) USING BTREE,
	CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `products` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=25
;

 */
