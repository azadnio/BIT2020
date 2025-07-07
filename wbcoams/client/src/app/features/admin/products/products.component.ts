import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductService } from '../../../core/services/product.service';
import { MessageService } from '../../../core/services/message.service';
import { Product, Category, Brand } from '../../../core/models/product.model';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatSlideToggleModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class AdminProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  displayedColumns = [
    'image',
    'details',
    'price',
    'status',
    'created',
    'actions',
  ];

  searchQuery = '';
  categoryFilter = '';
  brandFilter = '';
  statusFilter = '';
  currentPage = 0;
  pageSize = 10;
  totalProducts = 0;
  activeProducts = 0;
  inactiveProducts = 0;
  isLoading = false;

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadBrands();
  }

  loadProducts(): void {
    this.isLoading = true;

    const params = {
      page: this.currentPage + 1,
      limit: this.pageSize,
      search: this.searchQuery || undefined,
      category: this.categoryFilter || undefined,
      brand: this.brandFilter || undefined,
      status: this.statusFilter || undefined,
    };

    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.total;
        this.calculateStats();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      },
    });
  }

  private calculateStats(): void {
    this.activeProducts = this.products.filter((p) => p.isActive).length;
    this.inactiveProducts = this.products.filter((p) => !p.isActive).length;
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  loadBrands(): void {
    this.productService.getBrands().subscribe({
      next: (brands) => {
        this.brands = brands;
      },
      error: (error) => {
        console.error('Error loading brands:', error);
      },
    });
  }

  onFiltersChange(): void {
    this.currentPage = 0;
    this.loadProducts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.categoryFilter = '';
    this.brandFilter = '';
    this.statusFilter = '';
    this.currentPage = 0;
    this.loadProducts();
  }

  addNewProduct(): void {
    this.router.navigate(['/admin/products/new']);
  }

  viewProduct(product: Product): void {
    console.log('View product:', product);
  }

  editProduct(product: Product): void {
    console.log('Edit product:', product);
  }

  deleteProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete "${product.description}"?`)) {
      // In a real app, call delete service
      console.log('Delete product:', product);
      this.messageService.showSuccess('Product deleted successfully');
    }
  }

  toggleProductStatus(product: Product, isActive: boolean): void {
    // Update product status
    console.log('Toggle product status:', product, isActive);
    this.messageService.showSuccess(
      `Product ${isActive ? 'activated' : 'deactivated'} successfully`,
    );
  }
}
