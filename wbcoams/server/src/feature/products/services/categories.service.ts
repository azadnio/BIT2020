import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { ICategory } from '@SharedRepo/interfaces/category.interface';
import { LogService } from 'src/core/log/log.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly context: RequestContextService,
    private readonly logService: LogService
  ) {}

  async getAllCategories(pagination?: PaginationDto) {
    if (pagination?.includeDeleted && !this.context.isManagerOrAdmin()) {
      throw new BadRequestException('Cannot access deleted categories');
    }

    const categories = await this.categoryRepository.selectAll(pagination);
    return categories;
  }

  async getProductsByCategory(categoryId: number, query: PaginationDto) {
    if (query.includeDeleted && !this.context.isBackOfficeUser()) {
      throw new BadRequestException('Include deleted products is not allowed.');
    }

    const result = await this.categoryRepository.getProductsByCategory(categoryId, query);
    if (!result || result.length === 0) {
      throw new BadRequestException(`No products found for category with ID ${categoryId}.`);
    }
    return result;
  }

  async getCategoryById(id: number) {
    return await this.categoryRepository.selectById(id);
  }

  async getBestSellers(pagination?: PaginationDto) {
    if (pagination?.includeDeleted && !this.context.isManagerOrAdmin()) {
      throw new BadRequestException('Cannot access deleted categories');
    }

    return this.categoryRepository.getBestSellers(pagination);
  }

  async createCategory(category: CategoryDto, skipReturn = false): Promise<ICategory | number> {
    const { name } = category;
    if (!name) {
      throw new BadRequestException('Category name is required.');
    }
    category.name = category.name.toLowerCase().trim();
    (category as ICategory).createdUserId = this.context.userId;
    (category as ICategory).updatedUserId = this.context.userId;

    // Check if the category already exists
    const existingCategory = await this.categoryRepository.getCategoryByName(category.name);
    if (existingCategory) {
      throw new BadRequestException(`Category with name ${name} already exists.`);
    }

    const categoryId = await this.categoryRepository.create(category as ICategory);
    if (!skipReturn) {
      return await this.categoryRepository.selectById(categoryId);
    }
    this.logService.creation(categoryId, `Created category with name ${name}`);
    return categoryId;
  }

  async updateCategory(id: number, category: UpdateCategoryDto, skipReturn: boolean): Promise<ICategory | boolean> {
    const existingCategory = await this.categoryRepository.getCategoryByName(category.name);
    if (existingCategory) {
      throw new BadRequestException(`Category with name ${category.name} already exists.`);
    }
    (category as ICategory).updatedUserId = this.context.userId;

    let result: boolean | ICategory = await this.categoryRepository.update(id, category as ICategory);

    if (!skipReturn) {
      result = await this.categoryRepository.selectById(id);
    }

    await this.logService.updation(id, `Updated category with ID ${Object.keys(category).join(', ')}`);
    return result;
  }

  async deleteCategory(id: number) {
    const result = await this.categoryRepository.delete(id, this.context.userId);
    if (!result) {
      throw new BadRequestException(`Failed to delete category with ID ${id}.`);
    }
    this.logService.deletion(id, `Deleted category with ID ${id}`);
  }
}
