import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { BrandsService } from './services/brands.service';
import { ProductsRepository } from './repositories/products.repository';
import { AuthModule } from 'src/core/auth/auth.module';
import { FileUploadModule } from 'src/common/file-upload/file-upload.mdule';
import { BrandsRepository } from './repositories/brands.repository';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [AuthModule, FileUploadModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    CategoriesService,
    BrandsService,
    ProductsRepository,
    BrandsRepository,
    CategoryRepository,
  ],
})
export class ProductsModule {}
