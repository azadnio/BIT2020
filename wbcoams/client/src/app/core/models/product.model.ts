// export interface  Product {
//   id: number;
//   isActive: boolean;
//   description: string;
//   info: string;
//   categoryId: number;
//   price: number;
//   brandId: number;
//   unit: string;
//   image?: string;
//   oldPrice?: number;
//   createdAt: string;
//   updatedAt: string;
//   category?: Category;
//   createdUserId?: number;
//   updatedUserId?: number;
//   brand?: Brand;
// }

import { IItem } from '@sharedlib/interfaces/item.interface';

// export interface Category {
//   id: number;
//   name: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Brand {
//   id: number;
//   name: string;
//   logo?: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

export interface IProductResponse extends IItem {
  categoryName?: string;
  brandName?: string;
  oldPrice?: number;
  createdUser?: string;
  updatedUser?: string;
}
