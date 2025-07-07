import { Inject, Injectable } from '@nestjs/common';
import { ICategory } from '@SharedRepo/interfaces/category.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';
// import { RequestContextService } from "src/auth/request-context.service";
import { RequestContextService } from 'src/core/auth/request-context.service';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';

@Injectable()
export class CategoryRepository extends BaseRepository<ICategory, PaginationDto> {
  protected tableName = 'categories';
  protected hasCreatedColumns = true;
  protected hasUpdatedColumns = true;
  protected hasSoftDelete = true;

  constructor(
    @Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService,
    protected readonly context: RequestContextService
  ) {
    super(db);
  }

  public async selectById(id: number): Promise<ICategory> {
    return this.findById(id);
  }

  public async selectAll(queryParams: IPagination): Promise<ICategory[]> {
    return this.findAll(queryParams, false);
  }

  public async create(entity: Partial<ICategory>): Promise<number> {
    return this.insert(entity);
  }

  public async update(id: number, entity: Partial<ICategory>): Promise<boolean> {
    return this.update(id, entity);
  }

  public async delete(id: number, deletedBy: number): Promise<boolean> {
    return this.softDelete(id, deletedBy);
  }

  public async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T> {
    return this.db.withMultipleTransaction(runInTransaction, isContinueTransaction);
  }

  public async getProductsByCategory(categoryId: number, query: IPagination): Promise<ICategory[]> {
    if (!categoryId) {
      throw new Error('Category ID must be provided');
    }
    const { page = 1, limit = 10, includeDeleted = false } = query;
    const offset = (page - 1) * limit;

    return this.db.query<ICategory[]>(
      `SELECT 
                it.*, 
                c.name as categoryName, 
                b.name as brandName,
                u1.username as createdUser,
                u2.username as lastUpdatedUser
             FROM products it
             LEFT JOIN categories c ON it.categoryId = c.id
             LEFT JOIN brands b ON it.brandId = b.id
             LEFT JOIN users u1 ON it.createdUserId = u1.id
             LEFT JOIN users u2 ON it.updatedUserId = u2.id
             WHERE it.categoryId = ?
             ${includeDeleted ? '' : 'AND it.isActive = 1'}
             ORDER BY it.id DESC
             LIMIT ? OFFSET ?`,
      [categoryId, limit, offset]
    );
  }

  public async getCategoryByName(name: string): Promise<ICategory | null> {
    return this.findOneByField('name', name);
  }

  public async createCategoryIfNotExists(name: string): Promise<number> {
    name = name.toLowerCase().trim();
    const existingCategory = await this.getCategoryByName(name);
    if (existingCategory) {
      return existingCategory.id;
    }

    const categoryData: Partial<ICategory> = {
      name,
      createdUserId: this.context.userId,
      updatedUserId: this.context.userId,
    };
    const newCategoryId = await this.create(categoryData);
    return newCategoryId;
  }

  public async getBestSellers(pagination?: PaginationDto) {
    const items = await this.db.query<ICategory[]>(
      `SELECT 
                it.*, 
                c.name as categoryName,
                b.name as brandName,
                u1.username as createdUser,
                u2.username as lastUpdatedUser
             FROM products it
             LEFT JOIN categories c ON it.categoryId = c.id
             LEFT JOIN brands b ON it.brandId = b.id
             LEFT JOIN users u1 ON it.createdUserId = u1.id
             LEFT JOIN users u2 ON it.updatedUserId = u2.id
             WHERE it.isActive = 1
             ORDER BY it.soldCount DESC, it.id DESC
             LIMIT ? OFFSET ?`,
      [pagination?.limit || 10, (pagination?.page || 1) - 1 * (pagination?.limit || 10)]
    );
    if (!items || items.length === 0) {
      throw new Error('No best sellers found');
    }
    return items.splice(0, pagination?.limit || 10);
  }

  public async isCategoryExists(categoryId: number): Promise<boolean> {
    return await this.isExistsById(categoryId);
  }
}

/**
 * This repository handles CRUD operations for categories.
 * CREATE TABLE `categories` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    `createdUserId` INT(10) UNSIGNED NOT NULL,
    `updatedAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
    `updatedUserId` INT(10) UNSIGNED NOT NULL,
    `isActive` TINYINT(1) NOT NULL DEFAULT '1',
    `name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `name` (`name`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=4
;*/
