import { Inject, Injectable } from '@nestjs/common';
import { IInvoice } from '@SharedRepo/interfaces/invoice.interface';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { InvoicePaginationDto } from '../dtos/invoice-pagination.dto';

@Injectable()
export class InvoiceRepository extends BaseRepository<IInvoice, PaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'invoices';
    this.hasCreatedColumns = true;
    this.hasUpdatedColumns = true;
    this.hasSoftDelete = true;
  }

  override get genericSelectQuery(): string {
    throw new Error('genericSelectQuery is not applicable for InvoiceRepository');
  }

  public async selectById(id: number): Promise<IInvoice> {
    const sql = `SELECT * FROM invoices WHERE id = ?`;
    const [invoice] = await this.db.query<IInvoice[]>(sql, [id]);
    return invoice;
  }

  public async selectAll(queryParams: InvoicePaginationDto): Promise<IInvoice[]> {
    const { from, to, status, includeDeleted = false } = queryParams;
    let sql = `SELECT * FROM invoices`;
    const params: any[] = [];
    if (from) {
      sql += ` WHERE invoiceDate >= ?`;
      params.push(new Date(from));
    }
    if (to) {
      sql += params.length ? ` AND invoiceDate <= ?` : ` WHERE invoiceDate <= ?`;
      params.push(new Date(to));
    }
    if (status !== undefined) {
      sql += params.length ? ` AND status = ?` : ` WHERE status = ?`;
      params.push(status);
    }
    if (!includeDeleted) {
      sql += params.length ? ` AND deleted = 0` : ` WHERE deleted = 0`;
    }

    sql += ` ORDER BY invoiceDate DESC`;

    return await this.db.query<IInvoice[]>(sql, params);
  }

  public async create(invoice: Partial<IInvoice>): Promise<number> {
    return await this.insert(invoice);
  }

  public async update(id: number, invoice: Partial<IInvoice>): Promise<boolean> {
    return await this.update(id, invoice);
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

  public async getInvoicesByCustomerId(customerId: number, queryParams: InvoicePaginationDto): Promise<IInvoice[]> {
    const { from, to, status, includeDeleted = false } = queryParams;
    let sql = `
			SELECT 
				invoices.*, 
				createdUser.name AS createdUser, 
				lastUpdatedUser.name AS lastUpdatedUser
			FROM invoices
			LEFT JOIN users AS createdUser ON invoices.createdUserId = createdUser.id
			LEFT JOIN users AS lastUpdatedUser ON invoices.updatedUserId = lastUpdatedUser.id
			WHERE invoices.customerId = ?
		`;
    const params: any[] = [customerId];

    if (from) {
      sql += ` AND invoiceDate >= ?`;
      params.push(new Date(from));
    }
    if (to) {
      sql += ` AND invoiceDate <= ?`;
      params.push(new Date(to));
    }
    if (status !== undefined) {
      sql += ` AND status = ?`;
      params.push(status);
    }
    if (!includeDeleted) {
      sql += ` AND isActive = 0`;
    }

    sql += ` ORDER BY invoiceDate DESC`;
    return await this.db.query<IInvoice[]>(sql, params);
  }
}

/**
 * CREATE TABLE `invoices` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `customerId` INT(10) UNSIGNED NOT NULL,
    `invoiceDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    `subTotal` DECIMAL(12,2) NOT NULL DEFAULT '0.00',
    `discount` DECIMAL(12,2) NOT NULL DEFAULT '0.00',
    `total` DECIMAL(12,2) NOT NULL DEFAULT '0.00',
    `dueDate` DATETIME NULL DEFAULT NULL,
    `remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
    `status` ENUM('draft','finalized','paid','cancelled') NOT NULL DEFAULT 'draft' COLLATE 'utf8mb4_0900_ai_ci',
    `createdAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    `createdUserId` INT(10) UNSIGNED NOT NULL,
    `updatedAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
    `updatedUserId` INT(10) UNSIGNED NOT NULL,
    `isActive` TINYINT(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `customerId` (`customerId`) USING BTREE,
    CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=10
;*/
