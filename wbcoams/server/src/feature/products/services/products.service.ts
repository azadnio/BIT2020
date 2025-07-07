import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { moveFile } from 'src/common/utils/file.utils';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repositories/products.repository';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { BrandsRepository } from '../repositories/brands.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { IItem } from '@SharedRepo/interfaces/item.interface';
import { LogService } from 'src/core/log/log.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly context: RequestContextService,
    private readonly brandRepository: BrandsRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly logService: LogService
  ) {}

  async getAllProducts(query: PaginationDto) {
    const { includeDeleted = false } = query || {};
    if (includeDeleted && !this.context.isBackOfficeUser()) {
      throw new BadRequestException('Include deleted products is not allowed.');
    }
    return await this.productsRepository.selectAll(query);
  }

  async getProductById(id: number) {
    const product = await this.productsRepository.selectById(id);
    if (!product) {
      throw new BadRequestException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async getProductsByCategoryAndBrand(categoryId: number, brandId: number, query: PaginationDto) {
    if (query.includeDeleted && !this.context.isBackOfficeUser()) {
      throw new BadRequestException('Include deleted products is not allowed.');
    }
    return await this.productsRepository.getProductsByCategoryAndBrand(categoryId, brandId, query);
  }

  async getBestSellers(query: PaginationDto) {
    if (query.includeDeleted && !this.context.isManagerOrAdmin()) {
      throw new BadRequestException('Cannot access deleted products');
    }
    return this.productsRepository.getBestSellers(query);
  }

  async getFeaturedProducts(query: PaginationDto) {
    if (query.includeDeleted && !this.context.isManagerOrAdmin()) {
      throw new BadRequestException('Cannot access deleted products');
    }
    return this.productsRepository.getFeaturedProducts(query);
  }

  async createProduct(itemData: CreateProductDto, productImage: Express.Multer.File = null) {
    const createdProduct = await this.productsRepository.withMultipleTransaction(async () => {
      const { brandId, categoryId } = itemData;

      // Validate brand and category
      if (!this.brandRepository.isBrandExists(brandId)) {
        throw new BadRequestException(`Brand with ID ${brandId} does not exist.`);
      }
      if (!this.categoryRepository.isCategoryExists(categoryId)) {
        throw new BadRequestException(`Category with ID ${categoryId} does not exist.`);
      }

      (itemData as IItem).createdUserId = this.context.userId;
      (itemData as IItem).updatedUserId = this.context.userId;

      const productId = await this.productsRepository.create(itemData as IItem);

      if (productImage) {
        const imagePath = this.insertProductImage(productId, productImage);
        await this.productsRepository.update(productId, { image: imagePath });
      }

      return await this.productsRepository.selectById(productId);
    }, true);

    this.logService.creation(createdProduct.id, `Created product with name ${createdProduct.description}`);
    return createdProduct;
  }

  async updateProduct(productId: number, productData: UpdateProductDto, productImage: Express.Multer.File = null) {
    const updatedProduct = await this.productsRepository.withMultipleTransaction(async () => {
      if (!this.productsRepository.isProductExists(productId)) {
        throw new BadRequestException(`Product with ID ${productId} does not exist.`);
      }
      if (!this.brandRepository.isBrandExists(productData.brandId)) {
        throw new BadRequestException(`Brand with ID ${productData.brandId} does not exist.`);
      }
      if (!this.categoryRepository.isCategoryExists(productData.categoryId)) {
        throw new BadRequestException(`Category with ID ${productData.categoryId} does not exist.`);
      }

      if (productImage) {
        const imagePath = this.insertProductImage(productId, productImage);
        productData.image = imagePath;
      }
      (productData as IItem).updatedUserId = this.context.userId;

      await this.productsRepository.update(productId, productData as IItem);
      return await this.productsRepository.selectById(productId);
    }, true);

    if (!updatedProduct) {
      throw new BadRequestException(`Product with ID ${productId} not found or no changes made.`);
    }

    this.logService.updation(
      productId,
      `Updated product with ID ${productId} : ${Object.keys(productData).join(', ')}`
    );
    return updatedProduct;
  }

  async deleteProduct(productId: number) {
    const result = await this.productsRepository.delete(productId, this.context.userId);
    if (!result) {
      throw new BadRequestException(`Product with ID ${productId} not found or no changes made.`);
    }
    this.logService.deletion(productId, `Deleted product with ID ${productId}`);

    return { id: productId, deleted: true };
  }

  private insertProductImage(productId: number, productImage: Express.Multer.File): string {
    if (!productImage) {
      return '';
    }

    const extension = productImage.originalname.split('.').pop();
    const tempFilePath = `uploads/temp/${productImage.filename}`;
    const newFilePath = `uploads/products/${productId}-${Date.now()}.${extension}`;

    moveFile(tempFilePath, newFilePath);
    return newFilePath;
  }
}
