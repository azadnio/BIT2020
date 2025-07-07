import { Inject, Injectable } from '@nestjs/common';
import { IInvoiceItem } from '@SharedRepo/interfaces/invoice-items.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';
import { ISalesReturnItem } from '@SharedRepo/interfaces/sales-return-tems.interface';
import { ISalesReturn } from '@SharedRepo/interfaces/sales-return.interface';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';

@Injectable()
export class SalesReturnItemRepository extends BaseRepository<ISalesReturnItem, PaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'sales_return_items';
    this.hasCreatedColumns = false;
    this.hasUpdatedColumns = false;
    this.hasSoftDelete = true;
  }

  public async getSalesReturnItems(salesReturnId: number): Promise<ISalesReturnItem[]> {
    const sql = `
            SELECT 
                sales_return_items.*, 
                p.description, 
                p.categoryId, 
                c.name AS categoryName, 
                p.brandId, 
                b.name AS brandName, 
                p.image, 
                p.unit
            FROM sales_return_items
            LEFT JOIN products p ON sales_return_items.itemId = p.id
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN brands b ON p.brandId = b.id
            WHERE salesReturnId = ?
        `;
    const rows = await this.db.query<ISalesReturnItem[]>(sql, [salesReturnId]);
    return Array.isArray(rows) ? rows : [];
  }

  public async insertSalesReturnItems(salesReturnId: number, items: ISalesReturnItem[]): Promise<boolean> {
    const values = items.map((item) => [salesReturnId, item.itemId, item.price, item.quantity]);
    const [result]: any = await this.db.execute(
      `INSERT INTO sales_return_items (salesReturnId, itemId, price, quantity) VALUES ?`,
      [values]
    );
    return result.affectedRows > 0;
  }

  public async deleteSalesReturnItems(salesReturnId: number): Promise<boolean> {
    const sql = ` DELETE FROM sales_return_items WHERE salesReturnId = ? `;
    const result = await this.db.execute(sql, [salesReturnId]);
    return result.affectedRows > 0;
  }

  override get genericSelectQuery(): string {
    // No need for a generic select query as this repository is specialized
    throw new Error('Generic select query is not applicable for InvoiceItemRepository');
  }

  // Implementing the abstract methods from BaseRepository
  // These methods will throw errors as this repository is not meant to be used directly.
  protected async selectById(_: number): Promise<ISalesReturnItem> {
    throw new Error('cannot find sales return item by ID');
  }

  protected async selectAll(_: IPagination): Promise<ISalesReturnItem[]> {
    throw new Error('cannot find all sales return items');
  }

  protected async create(_: Partial<ISalesReturnItem>): Promise<number> {
    throw new Error('cannot create sales return item');
  }

  protected async update(_: number, __: Partial<ISalesReturnItem>): Promise<boolean> {
    throw new Error('cannot update sales return item');
  }

  protected async delete(_: number, __: number): Promise<boolean> {
    throw new Error('cannot delete sales return item');
  }

  protected withMultipleTransaction<T>(_: () => Promise<T>, __: boolean): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

/**
CREATE TABLE `sales_return_items` (
	`salesReturnId` INT(10) UNSIGNED NOT NULL,
	`itemId` INT(10) UNSIGNED NOT NULL,
	`quantity` INT(10) NOT NULL DEFAULT '1',
	`price` DECIMAL(12,2) NOT NULL,
	INDEX `salesReturnId` (`salesReturnId`) USING BTREE,
	INDEX `itemId` (`itemId`) USING BTREE,
	CONSTRAINT `sales_return_items_ibfk_1` FOREIGN KEY (`salesReturnId`) REFERENCES `sales_return` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `sales_return_items_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `products` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

;*/
