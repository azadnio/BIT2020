import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BrandDto } from './dto/create-brand.dto';
import { CategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StripProtectedFieldsInterceptor } from 'src/common/interceptors/stripe-protected-feild.interceptor';

import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { Roles } from 'src/core/auth/decorators/roles.decorators';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly brandsService: BrandsService
  ) {}

  @Get()
  async getAllProducts(@Query() query: PaginationDto) {
    const products = await this.productsService.getAllProducts(query);
    return {
      products,
      total: products.length
    };
  }

  @Get('category/:categoryId/brand/:brandId')
  async getProductsByCategoryAndBrand(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('brandId', ParseIntPipe) brandId: number,
    @Query() query: PaginationDto
  ) {
    return this.productsService.getProductsByCategoryAndBrand(categoryId, brandId, query);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async createProduct(
    @UploadedFile() productImageFile: Express.Multer.File,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.createProduct(createProductDto, productImageFile);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() productImageFile: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.updateProduct(id, updateProductDto, productImageFile);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }

  @Get('brands')
  async getAllBrands(@Query() query: PaginationDto) {
    return this.brandsService.getAllBrands(query);
  }

  @Get('categories')
  async getAllCategories(@Query() query: PaginationDto) {
    return this.categoriesService.getAllCategories(query);
  }

  @Get('bestSellers')
  async getBestSellers(@Query() query: PaginationDto) {
    return this.productsService.getBestSellers(query);
  }

  @Get('featured')
  async getFeaturedProducts(@Query() query: PaginationDto) {
    return this.productsService.getFeaturedProducts(query);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Get('categories/:categoryId')
  async getProductsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number, @Query() query: PaginationDto) {
    return await this.categoriesService.getProductsByCategory(categoryId, query);
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async createCategory(@Body() category: CategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @Put('categories/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseInterceptors(StripProtectedFieldsInterceptor)
  async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() category: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, category, false);
  }

  @Delete('categories/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseInterceptors(StripProtectedFieldsInterceptor)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    await this.categoriesService.deleteCategory(id);
    return { id, deleted: true };
  }

  @Get('brands/:brandId')
  async getProductsByBrand(@Param('brandId', ParseIntPipe) brandId: number, @Query() query: PaginationDto) {
    const products = await this.brandsService.getProductsByBrand(brandId, query);
    if (!products) {
      throw new NotFoundException(`No products found for brand ID ${brandId}.`);
    }
    return products;
  }

  @Post('brands')
  @UseInterceptors(FileInterceptor('logo'))
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  async createBrand(@Body() brand: BrandDto, @UploadedFile() file: Express.Multer.File) {
    return this.brandsService.createBrand(brand, file, false, false);
  }

  @Put('brands/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
  @UseInterceptors(StripProtectedFieldsInterceptor)
  async updateBrand(
    @Param('id', ParseIntPipe) id: number,
    @Body() brand: BrandDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.brandsService.updateBrand(id, brand, file, false, false);
  }

  @Delete('brands/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteBrand(@Param('id', ParseIntPipe) id: number) {
    await this.brandsService.deleteBrand(id);
    return { id, deleted: true };
  }
}
