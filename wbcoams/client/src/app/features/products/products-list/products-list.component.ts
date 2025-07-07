import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <div class="products-container">
      <div class="header">
        <h1>Products</h1>
        <button mat-raised-button color="primary" (click)="createProduct()">
          <mat-icon>add</mat-icon>
          Add Product
        </button>
      </div>

      <mat-card class="filter-card">
        <div class="filter-row">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search products</mat-label>
            <input matInput [(ngModel)]="searchTerm" (input)="applyFilter()" 
                   placeholder="Product name or description">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Category</mat-label>
            <mat-select [(ngModel)]="selectedCategory" (selectionChange)="applyFilter()">
              <mat-option value="">All Categories</mat-option>
              <mat-option value="Door Locks">Door Locks</mat-option>
              <mat-option value="Nails">Nails</mat-option>
              <mat-option value="Roller Brush">Roller Brush</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Brand</mat-label>
            <mat-select [(ngModel)]="selectedBrand" (selectionChange)="applyFilter()">
              <mat-option value="">All Brands</mat-option>
              <mat-option value="Makita">Makita</mat-option>
              <mat-option value="Globe">Globe</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-card>

      <mat-card class="table-card">
        <div class="table-container">
          <table mat-table [dataSource]="filteredProducts" class="products-table">
            <ng-container matColumnDef="product">
              <th mat-header-cell *matHeaderCellDef>Product</th>
              <td mat-cell *matCellDef="let product">
                <div class="product-info">
                  @if (product.image) {
                    <img [src]="product.image" alt="Product image" class="product-image">
                  } @else {
                    <div class="product-placeholder">
                      <mat-icon>inventory</mat-icon>
                    </div>
                  }
                  <div class="product-details">
                    <div class="product-name">{{ product.description }}</div>
                    <div class="product-info-text">{{ product.info }}</div>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let product">
                <mat-chip class="category-chip">{{ product.category?.name }}</mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="brand">
              <th mat-header-cell *matHeaderCellDef>Brand</th>
              <td mat-cell *matCellDef="let product">{{ product.brand?.name }}</td>
            </ng-container>

            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let product">
                <div class="price-info">
                  <div class="current-price">LKR {{ product.price | number:'1.2-2' }}</div>
                  @if (product.oldPrice && product.oldPrice !== product.price) {
                    <div class="old-price">LKR {{ product.oldPrice | number:'1.2-2' }}</div>
                  }
                  <div class="unit">per {{ product.unit }}</div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let product">
                <mat-chip [class]="product.isActive ? 'status-active' : 'status-inactive'">
                  {{ product.isActive ? 'Active' : 'Inactive' }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let product">
                <button mat-icon-button (click)="viewProduct(product.id); $event.stopPropagation()">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button (click)="editProduct(product.id); $event.stopPropagation()">
                  <mat-icon>edit</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                class="table-row" (click)="viewProduct(row.id)"></tr>
          </table>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .products-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
      color: #333;
    }

    .filter-card {
      margin-bottom: 24px;
      padding: 16px;
    }

    .filter-row {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .search-field {
      flex: 2;
    }

    .filter-field {
      flex: 1;
    }

    .table-card {
      padding: 0;
    }

    .table-container {
      overflow-x: auto;
    }

    .products-table {
      width: 100%;
    }

    .product-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .product-image {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border-radius: 4px;
    }

    .product-placeholder {
      width: 48px;
      height: 48px;
      background-color: #f5f5f5;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
    }

    .product-details {
      flex: 1;
    }

    .product-name {
      font-weight: 500;
      margin-bottom: 4px;
    }

    .product-info-text {
      font-size: 12px;
      color: #666;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .category-chip {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .price-info {
      display: flex;
      flex-direction: column;
    }

    .current-price {
      font-weight: 500;
      color: #333;
    }

    .old-price {
      font-size: 12px;
      color: #999;
      text-decoration: line-through;
    }

    .unit {
      font-size: 12px;
      color: #666;
    }

    .status-active {
      background-color: #4CAF50;
      color: white;
    }

    .status-inactive {
      background-color: #757575;
      color: white;
    }

    .table-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .table-row:hover {
      background-color: #f5f5f5;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }

      .filter-row {
        flex-direction: column;
      }

      .search-field,
      .filter-field {
        flex: 1;
        width: 100%;
      }
    }
  `]
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = ['product', 'category', 'brand', 'price', 'status', 'actions'];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  selectedCategory = '';
  selectedBrand = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Mock data - replace with actual service call
    this.products = [
      {
        id: 1,
        isActive: true,
        description: 'Makita Drill Set',
        info: 'Professional cordless drill',
        categoryId: 1,
        price: 15000,
        brandId: 1,
        unit: 'piece',
        createdAt: new Date().toISOString(),
        createdUserId: 1,
        updatedAt: new Date().toISOString(),
        updatedUserId: 1,
        category: { id: 1, name: 'Tools', isActive: true, createdAt: '', createdUserId: 1, updatedAt: '', updatedUserId: 1 },
        brand: { id: 1, name: 'Makita', isActive: true, createdAt: '', createdUserId: 1, updatedAt: '', updatedUserId: 1 }
      }
    ];
    this.filteredProducts = [...this.products];
  }

  applyFilter(): void {
    let filtered = [...this.products];

    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.description?.toLowerCase().includes(searchLower) ||
        product.info?.toLowerCase().includes(searchLower)
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(product => 
        product.category?.name === this.selectedCategory
      );
    }

    if (this.selectedBrand) {
      filtered = filtered.filter(product => 
        product.brand?.name === this.selectedBrand
      );
    }

    this.filteredProducts = filtered;
  }

  createProduct(): void {
    this.router.navigate(['/dashboard/products/create']);
  }

  viewProduct(id: number): void {
    this.router.navigate(['/dashboard/products', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/dashboard/products/edit', id]);
  }
}
