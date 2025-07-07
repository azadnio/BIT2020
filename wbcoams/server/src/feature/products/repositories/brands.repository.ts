import { Inject, Injectable } from '@nestjs/common';
import { IBrand } from '@SharedRepo/interfaces/brand.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';
// import { RequestContextService } from "src/auth/request-context.service";
import { RequestContextService } from 'src/core/auth/request-context.service';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';

@Injectable()
export class BrandsRepository extends BaseRepository<IBrand, IPagination> {
  protected tableName = 'brands';
  protected hasCreatedColumns = true;
  protected hasUpdatedColumns = true;
  protected hasSoftDelete = true;

  constructor(
    @Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService,
    protected readonly context: RequestContextService
  ) {
    super(db);
  }

  public async selectById(id: number): Promise<IBrand | null> {
    return await this.findById(id);
  }

  public async selectAll(queryParams: IPagination): Promise<IBrand[]> {
    return await this.findAll(queryParams);
  }

  public async create(brand: Partial<IBrand>): Promise<number> {
    return await this.insert(brand);
  }

  public async update(id: number, brand: Partial<IBrand>): Promise<boolean> {
    return await this.update(id, brand);
  }

  public async delete(id: number, deletedBy: number): Promise<boolean> {
    return await this.softDelete(id, deletedBy);
  }

  public async getBrandByName(name: string): Promise<IBrand | null> {
    return await this.findOneByField('name', name);
  }

  public async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T> {
    return await this.db.withMultipleTransaction(runInTransaction, isContinueTransaction);
  }

  public async getItemsByBrand(brandId: number, query: IPagination): Promise<IBrand[]> {
    if (!brandId) {
      throw new Error('Brand ID must be provided');
    }
    const { page = 1, limit = 10, includeDeleted = false } = query;
    const offset = (page - 1) * limit;

    return this.db.query<IBrand[]>(
      `SELECT 
                it.*, 
                c.name as categoryName, 
                b.name as brandName,
                u1.username as createdUser,
                u2.username as lastUpdatedUser
            FROM products it 
            JOIN categories c ON it.categoryId = c.id
            JOIN brands b ON it.brandId = b.id
            LEFT JOIN users u1 ON it.createdUserId = u1.id
            LEFT JOIN users u2 ON it.updatedUserId = u2.id
            WHERE it.brandId = ? ${includeDeleted ? '' : 'AND it.isActive = 1'}
            ORDER BY it.id DESC 
            LIMIT ? OFFSET ?`,
      [brandId, limit, offset]
    );
  }

  public async createBrandIfNotExists(brand: string): Promise<number> {
    brand = brand.toLowerCase().trim();
    const existingBrand = await this.getBrandByName(brand);
    if (existingBrand) {
      return existingBrand.id;
    }

    const brandData: Partial<IBrand> = {
      name: brand,
      createdUserId: this.context.userId,
      updatedUserId: this.context.userId,
    };
    const newBrandId = await this.create(brandData);
    return newBrandId;
  }

  public async isBrandExists(brandId: number): Promise<boolean> {
    return await this.isExistsById(brandId);
  }
}
