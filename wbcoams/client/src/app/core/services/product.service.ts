import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Product, Category, Brand } from '../models/product.model';
import { IItem } from '@sharedlib/interfaces/item.interface'; // Adjust the import path as necessary
import { IBrand } from '@sharedlib/interfaces/brand.interface';
import { ICategory } from '@sharedlib/interfaces/category.interface';
import { I } from '@angular/cdk/a11y-module.d-DBHGyKoh';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/products';

  getProducts(params?: any): Observable<{ products: IItem[]; total: number }> {
    let httpParams = new HttpParams();

    // if (params) {
    //   Object.keys(params).forEach((key) => {
    //     if (params[key] !== null && params[key] !== undefined) {
    //       httpParams = httpParams.set(key, params[key]);
    //     }
    //   });
    // }

    return this.http.get<{ products: IItem[]; total: number }>(this.API_URL, {
      params: httpParams,
    });
  }

  getFeaturedProducts(): Observable<IItem[]> {
    console.log('Fetching featured products from:', `${this.API_URL}/featured`);
    return this.http.get<IItem[]>(`${this.API_URL}/featured`);
  }

  getProduct(id: number): Observable<IItem> {
    return this.http.get<IItem>(`${this.API_URL}/${id}`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.API_URL}/categories`);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.API_URL}/brands`);
  }

  searchProducts(query: string): Observable<IItem[]> {
    const params = new HttpParams().set('search', query);
    return this.http.get<IItem[]>(`${this.API_URL}/search`, { params });
  }

  createProduct(product: Partial<IItem>): Observable<IItem> {
    return this.http.post<IItem>(this.API_URL, product);
  }

  updateProduct(id: number, product: Partial<IItem>): Observable<IItem> {
    return this.http.put<IItem>(`${this.API_URL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  uploadProductImage(productId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.API_URL}/${productId}/image`, formData);
  }
}
