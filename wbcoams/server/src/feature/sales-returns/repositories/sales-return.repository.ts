import { Inject, Injectable } from '@nestjs/common';
import { IInvoice } from '@SharedRepo/interfaces/invoice.interface';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { ISalesReturn } from '@SharedRepo/interfaces/sales-return.interface';
import { SalesReturnPaginationDto } from '../dtos/sales-return-pagination.dto';

@Injectable()
export class SalesReturnRepository extends BaseRepository<ISalesReturn, SalesReturnPaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'sales_return';
    this.hasCreatedColumns = true;
    this.hasUpdatedColumns = true;
    this.hasSoftDelete = true;
  }

  override get genericSelectQuery(): string {
    throw new Error('genericSelectQuery is not applicable for SalesReturnRepository');
  }

  public async selectById(id: number): Promise<ISalesReturn> {
    const sql = `SELECT * FROM sales_return WHERE id = ?`;
    const [salesReturn] = await this.db.query<ISalesReturn[]>(sql, [id]);
    return salesReturn ? salesReturn : null;
  }

  public async selectAll(queryParams: SalesReturnPaginationDto): Promise<ISalesReturn[]> {
    const { from, to, includeDeleted = false } = queryParams;
    let sql = `SELECT * FROM sales_return`;
    const params: any[] = [];
    if (from) {
      sql += ` WHERE returnDate >= ?`;
      params.push(new Date(from));
    }
    if (to) {
      sql += params.length ? ` AND returnDate <= ?` : ` WHERE returnDate <= ?`;
      params.push(new Date(to));
    }
    if (!includeDeleted) {
      sql += params.length ? ` AND deleted = 0` : ` WHERE deleted = 0`;
    }

    sql += ` ORDER BY returnDate DESC`;

    return await this.db.query<ISalesReturn[]>(sql, params);
  }

  public async create(salesReturn: Partial<ISalesReturn>): Promise<number> {
    return await this.insert(salesReturn);
  }

  public async update(id: number, salesReturn: Partial<ISalesReturn>): Promise<boolean> {
    return await this.update(id, salesReturn);
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

  public async getSalesReturnsByCustomerId(
    customerId: number,
    queryParams: SalesReturnPaginationDto
  ): Promise<ISalesReturn[]> {
    const { from, to, includeDeleted = false } = queryParams;
    let sql = `
            SELECT
                salesReturn.*, 
                createdUser.name AS createdUser, 
                lastUpdatedUser.name AS lastUpdatedUser
            FROM sales_return
            LEFT JOIN users AS createdUser ON salesReturn.createdUserId = createdUser.id
            LEFT JOIN users AS lastUpdatedUser ON salesReturn.updatedUserId = lastUpdatedUser.id
            WHERE salesReturn.customerId = ?
        `;
    const params: any[] = [customerId];

    if (from) {
      sql += ` AND returnDate >= ?`;
      params.push(new Date(from));
    }
    if (to) {
      sql += ` AND returnDate <= ?`;
      params.push(new Date(to));
    }
    if (!includeDeleted) {
      sql += ` AND isActive = 0`;
    }

    sql += ` ORDER BY returnDate DESC`;
    return await this.db.query<ISalesReturn[]>(sql, params);
  }
}

/**
CREATE TABLE `sales_return` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`customerId` INT(10) UNSIGNED NOT NULL,
	`returnDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`total` DECIMAL(12,2) NOT NULL DEFAULT '0.00',
	`remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`createdAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`createdUserId` INT(10) UNSIGNED NOT NULL,
	`updatedAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
	`updatedUserId` INT(10) UNSIGNED NOT NULL,
	`isActive` TINYINT(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `customerId` (`customerId`) USING BTREE,
	CONSTRAINT `sales_return_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

 */
