import { Inject, Injectable } from '@nestjs/common';
import { IItem } from '@SharedRepo/interfaces/item.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';

@Injectable()
export class ProductsRepository extends BaseRepository<IItem, PaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'products';
    this.hasCreatedColumns = true;
    this.hasUpdatedColumns = true;
    this.hasSoftDelete = true;
  }

  protected get genericSelectQuery(): string {
    const selectionSql = `
            SELECT 
                ${this.tableName}.*,
                c.name as categoryName, 
                b.name as brandName 
            FROM ${this.tableName}
            JOIN categories c ON ${this.tableName}.categoryId = c.id
            JOIN brands b ON ${this.tableName}.brandId = b.id
            LEFT JOIN users u1 ON ${this.tableName}.createdUserId = u1.id
            LEFT JOIN users u2 ON ${this.tableName}.updatedUserId = u2.id`;
    return selectionSql;
  }

  public async selectById(id: number): Promise<IItem> {
    return await this.findById(id);
  }

  public async getProductsByCategoryAndBrand(
    categoryId: number,
    brandId: number,
    query: PaginationDto
  ): Promise<IItem[]> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const sql = `
            ${this.genericSelectQuery}
            WHERE ${this.tableName}.categoryId = ? AND ${this.tableName}.brandId = ?
            LIMIT ? OFFSET ?
            ORDER BY ${this.tableName}.id ASC`;

    const rows = await this.db.query<IItem[]>(sql, [categoryId, brandId, limit, offset]);
    return Array.isArray(rows) ? rows : [];
  }

  public async selectAll(queryParams: IPagination): Promise<IItem[]> {
    return await this.findAll(queryParams, true, false);
  }

  public async create(productData: Partial<IItem>): Promise<number> {
    return await this.insert(productData);
  }

  public async update(id: number, productData: Partial<IItem>): Promise<boolean> {
    return await this.updateById(id, productData);
  }

  public async delete(id: number, deletedBy: number): Promise<boolean> {
    return await this.softDelete(id, deletedBy);
  }

  public async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T> {
    return await this.db.withMultipleTransaction(runInTransaction, isContinueTransaction);
  }

  public async isProductExists(productId: number): Promise<boolean> {
    return await this.isExistsById(productId);
  }

  public async getBestSellers(query: PaginationDto): Promise<IItem[]> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const sql = `
            ${this.genericSelectQuery}
            WHERE ${this.tableName}.isActive = 1
            LIMIT ? OFFSET ?`;

    const rows = await this.db.query<IItem[]>(sql, [limit, offset]);
    return Array.isArray(rows) ? rows : [];
  }

  /**
   * Gets featured products based on frequent sales or new products using a database view.
   * Featured products are determined by:
   * 1. Products with high sales volume (frequent sales)
   * 2. Recently created products (new arrivals)
   * 3. A feature score that combines sales data and recency
   * 
   * @param query Pagination parameters
   * @returns List of featured products ordered by feature score
   */
  public async getFeaturedProducts(query: PaginationDto): Promise<IItem[]> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const sql = `
            SELECT 
                id, isActive, description, info, categoryId, price, brandId, unit, image, oldPrice,
                createdAt, createdUserId, updatedAt, updatedUserId,
                categoryName, brandName, totalSold, daysSinceCreated, feature_score
            FROM featured_products_view
            ORDER BY feature_score DESC, createdAt DESC
            LIMIT ? OFFSET ?`;

    const rows = await this.db.query<IItem[]>(sql, [limit, offset]);
    return Array.isArray(rows) ? rows : [];
  }
}

/**
 * CREATE TABLE `products` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`isActive` TINYINT(1) NOT NULL DEFAULT '1',
	`description` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`info` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`categoryId` INT(10) UNSIGNED NOT NULL,
	`price` DECIMAL(12,2) NOT NULL,
	`brandId` INT(10) UNSIGNED NOT NULL,
	`unit` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`image` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`oldPrice` DECIMAL(12,2) NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`createdUserId` INT(10) UNSIGNED NOT NULL,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
	`updatedUserId` INT(10) UNSIGNED NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `description` (`description`) USING BTREE,
	INDEX `idx_category` (`categoryId`) USING BTREE,
	INDEX `idx_brand` (`brandId`) USING BTREE,
	CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=131
;

 */