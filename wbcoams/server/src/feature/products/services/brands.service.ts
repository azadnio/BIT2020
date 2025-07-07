import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BrandDto } from '../dto/create-brand.dto';
import { moveFile } from 'src/common/utils/file.utils';
import { BrandsRepository } from '../repositories/brands.repository';
import { IBrand } from '@SharedRepo/interfaces/brand.interface';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { LogService } from 'src/core/log/log.service';

@Injectable()
export class BrandsService {
  constructor(
    private readonly brandrepository: BrandsRepository,
    private readonly context: RequestContextService,
    private readonly logService: LogService
  ) {}

  // async getProductsByCategoryAndBrand(categoryId: number, brandId: number, query: PaginationDto, connection?: PoolConnection) {
  //     const { page = 1, limit = 10 } = query;
  //     const offset = (page - 1) * limit;

  //     if (!categoryId || !brandId) {
  //         throw new Error('Both categoryId and brandId must be provided');
  //     }

  //     const conn = connection || this.pool;

  //     const [rows] = await conn.query(
  //         `SELECT
  //             it.*,
  //             c.name as categoryName,
  //             b.name as brandName,
  //             u1.username as createdUser,
  //             u2.username as lastUpdatedUser
  //         FROM products it
  //         JOIN categories c ON it.categoryId = c.id
  //         JOIN brands b ON it.brandId = b.id
  //         LEFT JOIN users u1 ON it.createdUserId = u1.id
  //         LEFT JOIN users u2 ON it.updatedUserId = u2.id
  //         WHERE it.categoryId = ? AND it.brandId = ? AND it.isActive = 1
  //         ORDER BY it.id DESC
  //         LIMIT ? OFFSET ?`,
  //         [categoryId, brandId, limit, offset]
  //     );
  //     return rows;
  // }

  async getProductsByBrand(brandId: number, query: PaginationDto) {
    if (query.includeDeleted && !this.context.isBackOfficeUser()) {
      throw new BadRequestException('Include deleted products is not allowed.');
    }
    return await this.brandrepository.getItemsByBrand(brandId, query);
  }

  async getAllBrands(pagination?: PaginationDto) {
    if (pagination?.includeDeleted && !this.context.isManagerOrAdmin()) {
      throw new BadRequestException('Cannot access deleted brands');
    }
    return await this.brandrepository.selectAll(pagination);
  }

  async getBrandById(id: number, query?: PaginationDto) {
    return await this.brandrepository.selectById(id);
  }

  async createBrand(
    brand: BrandDto,
    logoFile: Express.Multer.File,
    isContinueTransaction: boolean,
    skipReturn: boolean
  ): Promise<IBrand | number> {
    const { name } = brand;
    if (!name) {
      throw new BadRequestException('Brand name is required.');
    }
    brand.name = brand.name.toLowerCase().trim();
    (brand as IBrand).createdUserId = this.context.userId;
    (brand as IBrand).updatedUserId = this.context.userId;

    // Check if the brand already exists
    const existingBrand = await this.brandrepository.getBrandByName(brand.name);
    if (existingBrand) {
      throw new BadRequestException(`Brand with name ${name} already exists.`);
    }

    const result = await this.brandrepository.withMultipleTransaction(async () => {
      const brandId = await this.brandrepository.create(brand);
      if (!logoFile) {
        brand.logo = this.insertBrandLogo(brandId, logoFile);
        await this.brandrepository.update(brandId, { logo: brand.logo });
      }

      if (!skipReturn) {
        return brandId;
      }
      return await this.brandrepository.selectById(brandId);
    }, isContinueTransaction);

    const brandId = typeof result === 'number' ? result : result.id;
    this.logService.creation(brandId, 'Created brand new brand');
    return result;
  }

  async updateBrand(
    id: number,
    brand: BrandDto,
    logoFile: Express.Multer.File,
    isContinueTransaction: boolean,
    skipReturn: boolean
  ) {
    const existingBrand = await this.brandrepository.selectById(id);
    if (!existingBrand) {
      throw new BadRequestException(`Brand with ID ${id} not found.`);
    }
    (brand as IBrand).updatedUserId = this.context.userId;

    const result = await this.brandrepository.withMultipleTransaction(async () => {
      if (logoFile) {
        brand.logo = this.insertBrandLogo(id, logoFile);
      }
      const updatedBrand = await this.brandrepository.update(id, brand);
      if (!updatedBrand) {
        throw new BadRequestException(`Failed to update brand with ID ${id}.`);
      }

      if (!skipReturn) {
        return id;
      }
      return await this.brandrepository.selectById(id);
    }, isContinueTransaction);

    if (result) {
      this.logService.updation(id, `Updated brand with ID ${Object.keys(brand).join(', ')}`);
    }
    return result;
  }

  async deleteBrand(id: number) {
    const result = await this.brandrepository.delete(id, this.context.userId);
    if (!result) {
      throw new BadRequestException(`Failed to delete brand with ID ${id}.`);
    }
    this.logService.deletion(id, `Deleted brand with ID ${id}`);
  }

  private insertBrandLogo(brandId: number, logoFile: Express.Multer.File): string {
    if (!logoFile) {
      return '';
    }

    const tempPath = `uploads/temp/${logoFile.filename}`;
    const logoPath = `uploads/brands/${brandId}/${logoFile.originalname}`;
    moveFile(tempPath, logoPath);

    return logoPath;
  }
}

/***
 * CREATE TABLE `brands` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    `createdUserId` INT(10) UNSIGNED NOT NULL,
    `updatedAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
    `updatedUserId` INT(10) UNSIGNED NOT NULL,
    `isActive` TINYINT(1) NOT NULL DEFAULT '1',
    `name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
    `logo` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `name` (`name`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=4
;

 */
