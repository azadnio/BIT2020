import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../core/services/product.service';
import { IProductResponse } from '../../../core/models/product.model';
import { ICategory } from '@sharedlib/interfaces/category.interface';
import { IBrand } from '@sharedlib/interfaces/brand.interface';
import { IItem } from '@sharedlib/interfaces/item.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  products: IProductResponse[] = [];
  categories: ICategory[] = [];
  brands: IBrand[] = [];

  searchQuery = '';
  selectedCategory = '';
  selectedBrand = '';
  sortBy = 'name_asc';

  currentPage = 0;
  pageSize = 12;
  totalProducts = 0;

  isLoading = false;

  // Hardcoded categories for demonstration
  private hardcodedCategories: Partial<ICategory>[]  = [
    { id: 1, name: 'Power Tools', isActive: true },
    { id: 2, name: 'Hand Tools', isActive: true },
    { id: 3, name: 'Hardware', isActive: true },
    { id: 4, name: 'Safety Equipment', isActive: true },
    { id: 5, name: 'Electrical', isActive: true }
  ];
  // private hardcodedCategories: ICategory[]  = [
  //   { id: 1, name: 'Power Tools', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  //   { id: 2, name: 'Hand Tools', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  //   { id: 3, name: 'Hardware', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  //   { id: 4, name: 'Safety Equipment', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  //   { id: 5, name: 'Electrical', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' }
  // ];

  // Hardcoded brands for demonstration
  private hardcodedBrands: Partial<IBrand>[] = [
    { id: 1, name: 'DeWalt', logo: 'https://via.placeholder.com/100x50/FFD700/000000?text=DeWalt', isActive: true },
    { id: 2, name: 'Makita', logo: 'https://via.placeholder.com/100x50/00BFFF/FFFFFF?text=Makita', isActive: true },
    { id: 3, name: 'Bosch', logo: 'https://via.placeholder.com/100x50/C41E3A/FFFFFF?text=Bosch', isActive: true },
    { id: 4, name: 'Stanley', logo: 'https://via.placeholder.com/100x50/000000/FFFF00?text=Stanley', isActive: true },
    { id: 5, name: 'Craftsman', logo: 'https://via.placeholder.com/100x50/FF0000/FFFFFF?text=Craftsman', isActive: true }
  ];

  private hardcodedProducts = [];
  
  // Hardcoded products for demonstration
  // private hardcodedProducts: Partial<IProduct>[] = [
  //   {
  //     id: 1,
  //     isActive: true,
  //     description: "DeWalt 20V MAX Cordless Drill Kit",
  //     info: "Professional grade cordless drill with 2-speed transmission and LED light.",
  //     categoryId: 1,
  //     price: 15999.99,
  //     brandId: 1,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop&crop=center",
  //     oldPrice: 18999.99,
  //     createdAt: "2024-01-15T10:30:00Z",
  //     updatedAt: "2024-06-01T14:20:00Z",
  //     category: this.hardcodedCategories[0],
  //     brand: this.hardcodedBrands[0],
  //     createdUserId: 1,
  //     updatedUserId: 2
  //   },
  //   {
  //     id: 2,
  //     isActive: true,
  //     description: "Makita Circular Saw 7-1/4 inch",
  //     info: "High-performance circular saw with electric brake and dust blower.",
  //     categoryId: 1,
  //     price: 12500.00,
  //     brandId: 2,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop&crop=center",
  //     createdAt: "2024-02-01T09:15:00Z",
  //     updatedAt: "2024-05-15T11:30:00Z",
  //     category: this.hardcodedCategories[0],
  //     brand: this.hardcodedBrands[1],
  //     createdUserId: 1,
  //     updatedUserId: 1
  //   },
  //   {
  //     id: 3,
  //     isActive: true,
  //     description: "Bosch Hammer Drill SDS-Plus",
  //     info: "Rotary hammer drill with SDS-Plus chuck for concrete and masonry.",
  //     categoryId: 1,
  //     price: 22000.00,
  //     brandId: 3,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop&crop=center",
  //     oldPrice: 25000.00,
  //     createdAt: "2024-01-20T14:45:00Z",
  //     updatedAt: "2024-04-10T16:20:00Z",
  //     category: this.hardcodedCategories[0],
  //     brand: this.hardcodedBrands[2],
  //     createdUserId: 2,
  //     updatedUserId: 1
  //   },
  //   {
  //     id: 4,
  //     isActive: true,
  //     description: "Stanley 16oz Claw Hammer",
  //     info: "Classic steel claw hammer with fiberglass handle for durability.",
  //     categoryId: 2,
  //     price: 1250.00,
  //     brandId: 4,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1530843219474-c2ef48dc4d5f?w=400&h=300&fit=crop&crop=center",
  //     createdAt: "2024-03-01T08:00:00Z",
  //     updatedAt: "2024-03-01T08:00:00Z",
  //     category: this.hardcodedCategories[1],
  //     brand: this.hardcodedBrands[3],
  //     createdUserId: 1,
  //     updatedUserId: 1
  //   },
  //   {
  //     id: 5,
  //     isActive: true,
  //     description: "Craftsman Tool Set 230-Piece",
  //     info: "Complete tool set with sockets, wrenches, and screwdrivers in carrying case.",
  //     categoryId: 2,
  //     price: 8500.00,
  //     brandId: 5,
  //     unit: "set",
  //     image: "https://images.unsplash.com/photo-1558618047-43e94e5b5e8e?w=400&h=300&fit=crop&crop=center",
  //     oldPrice: 9500.00,
  //     createdAt: "2024-02-15T12:30:00Z",
  //     updatedAt: "2024-05-20T14:15:00Z",
  //     category: this.hardcodedCategories[1],
  //     brand: this.hardcodedBrands[4],
  //     createdUserId: 2,
  //     updatedUserId: 2
  //   },
  //   {
  //     id: 6,
  //     isActive: true,
  //     description: "Steel Bolts M8 x 40mm",
  //     info: "High-grade steel bolts with nuts and washers, pack of 50.",
  //     categoryId: 3,
  //     price: 450.00,
  //     brandId: 4,
  //     unit: "pack",
  //     image: "https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=400&h=300&fit=crop&crop=center",
  //     createdAt: "2024-01-10T10:00:00Z",
  //     updatedAt: "2024-01-10T10:00:00Z",
  //     category: this.hardcodedCategories[2],
  //     brand: this.hardcodedBrands[3],
  //     createdUserId: 1,
  //     updatedUserId: 1
  //   },
  //   {
  //     id: 7,
  //     isActive: false,
  //     description: "Safety Goggles Anti-Fog",
  //     info: "Clear safety goggles with anti-fog coating and adjustable strap.",
  //     categoryId: 4,
  //     price: 750.00,
  //     brandId: 1,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&h=300&fit=crop&crop=center",
  //     createdAt: "2024-01-05T15:20:00Z",
  //     updatedAt: "2024-06-25T09:45:00Z",
  //     category: this.hardcodedCategories[3],
  //     brand: this.hardcodedBrands[0],
  //     createdUserId: 1,
  //     updatedUserId: 2
  //   },
  //   {
  //     id: 8,
  //     isActive: true,
  //     description: "LED Work Light 4000 Lumens",
  //     info: "Portable LED work light with adjustable tripod and rechargeable battery.",
  //     categoryId: 5,
  //     price: 3500.00,
  //     brandId: 2,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
  //     createdAt: "2024-03-10T11:15:00Z",
  //     updatedAt: "2024-04-05T13:30:00Z",
  //     category: this.hardcodedCategories[4],
  //     brand: this.hardcodedBrands[1],
  //     createdUserId: 2,
  //     updatedUserId: 1
  //   },
  //   {
  //     id: 9,
  //     isActive: true,
  //     description: "Extension Cord 25ft Heavy Duty",
  //     info: "Heavy duty extension cord with GFCI protection and lighted end.",
  //     categoryId: 5,
  //     price: 2250.00,
  //     brandId: 3,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop&crop=center",
  //     oldPrice: 2750.00,
  //     createdAt: "2024-02-20T16:45:00Z",
  //     updatedAt: "2024-05-10T10:20:00Z",
  //     category: this.hardcodedCategories[4],
  //     brand: this.hardcodedBrands[2],
  //     createdUserId: 1,
  //     updatedUserId: 2
  //   },
  //   {
  //     id: 10,
  //     isActive: true,
  //     description: "Adjustable Wrench Set 3-Piece",
  //     info: "Chrome vanadium steel adjustable wrenches: 6-inch, 8-inch, and 10-inch.",
  //     categoryId: 2,
  //     price: 1850.00,
  //     brandId: 4,
  //     unit: "set",
  //     image: "https://images.unsplash.com/photo-1558584673-c834fb02d0e8?w=400&h=300&fit=crop&crop=center",
  //     createdAt: "2024-01-25T13:10:00Z",
  //     updatedAt: "2024-03-15T15:50:00Z",
  //     category: this.hardcodedCategories[1],
  //     brand: this.hardcodedBrands[3],
  //     createdUserId: 2,
  //     updatedUserId: 1
  //   },
  //   {
  //     id: 11,
  //     isActive: true,
  //     description: "DeWalt Angle Grinder 4.5 inch",
  //     info: "Compact angle grinder with paddle switch and dust ejection system.",
  //     categoryId: 1,
  //     price: 8750.00,
  //     brandId: 1,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop&crop=center",
  //     oldPrice: 9250.00,
  //     createdAt: "2024-02-28T09:30:00Z",
  //     updatedAt: "2024-06-15T12:45:00Z",
  //     category: this.hardcodedCategories[0],
  //     brand: this.hardcodedBrands[0],
  //     createdUserId: 1,
  //     updatedUserId: 2
  //   },
  //   {
  //     id: 12,
  //     isActive: true,
  //     description: "Hard Hat with Chin Strap",
  //     info: "ANSI/ISEA Z89.1 compliant hard hat with 4-point suspension system.",
  //     categoryId: 4,
  //     price: 950.00,
  //     brandId: 4,
  //     unit: "piece",
  //     image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
  //     createdAt: "2024-01-08T14:25:00Z",
  //     updatedAt: "2024-01-08T14:25:00Z",
  //     category: this.hardcodedCategories[3],
  //     brand: this.hardcodedBrands[3],
  //     createdUserId: 1,
  //     updatedUserId: 1
  //   }
  // ];

  ngOnInit(): void {
    this.loadHardcodedCategories();
    this.loadHardcodedBrands();

    // Handle query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['search']) {
        this.searchQuery = params['search'];
      }
      this.loadHardcodedProducts();
    });
  }

  loadHardcodedProducts(): void {
    this.isLoading = true;

    // Simulate loading delay
    setTimeout(() => {
      let filteredProducts = [...this.hardcodedProducts];

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        // filteredProducts = filteredProducts.filter(product => 
        //   product.name.toLowerCase().includes(query) ||
        //   product.info?.toLowerCase().includes(query) ||
        //   product.category?.name.toLowerCase().includes(query) ||
        //   product.brand?.name.toLowerCase().includes(query)
        // );
      }

      // Apply category filter
      if (this.selectedCategory) {
        // filteredProducts = filteredProducts.filter(product => 
        //   product.categoryId.toString() === this.selectedCategory
        // );
      }

      // Apply brand filter
      if (this.selectedBrand) {
        // filteredProducts = filteredProducts.filter(product => 
        //   product.brandId.toString() === this.selectedBrand
        // );
      }

      // Apply sorting
      // filteredProducts = this.sortProducts(filteredProducts);

      // Set total count before pagination
      this.totalProducts = filteredProducts.length;

      // Apply pagination
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.products = filteredProducts.slice(startIndex, endIndex);

      this.isLoading = false;
      console.log('Hardcoded products loaded:', this.products);
    }, 300);
  }

  loadHardcodedCategories(): void {
    // this.categories = this.hardcodedCategories;
  }

  loadHardcodedBrands(): void {
    // this.brands = this.hardcodedBrands;
  }

  private sortProducts(products: IItem[]): IItem[] {
    return products.sort((a, b) => {
      switch (this.sortBy) {
        case 'name_asc':
          return a.description.localeCompare(b.description);
        case 'name_desc':
          return b.description.localeCompare(a.description);
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }

  onImageError(event: any, product: IItem): void {
    // Fallback to placeholder images if the original image fails to load
    const fallbackImages = [
      'https://picsum.photos/400/300?grayscale&blur=1',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop&crop=center'
    ];
    
    const currentSrc = event.target.src;
    const currentIndex = fallbackImages.findIndex(img => currentSrc.includes(img.split('?')[0]));
    
    if (currentIndex < fallbackImages.length - 1) {
      event.target.src = fallbackImages[currentIndex + 1];
    } else if (!fallbackImages.some(img => currentSrc.includes(img.split('?')[0]))) {
      // If it's not a fallback image yet, try the first fallback
      event.target.src = fallbackImages[0];
    } else {
      // If all fallbacks fail, hide the image and show a placeholder
      event.target.style.display = 'none';
      const parent = event.target.parentElement;
      if (parent && !parent.querySelector('.image-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.innerHTML = '<mat-icon>image</mat-icon><p>Image not available</p>';
        parent.appendChild(placeholder);
      }
    }
  }

  onSearchChange(): void {
    this.currentPage = 0;
    this.loadHardcodedProducts();
  }

  onFiltersChange(): void {
    this.currentPage = 0;
    this.loadHardcodedProducts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHardcodedProducts();
  }

  addToCart(product: IItem): void {
    console.log('Add to cart:', product);
    this.snackBar.open(`${product.description} added to cart!`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  viewProduct(product: IItem): void {
    this.router.navigate(['/products', product.id]);
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.sortBy = 'name_asc';
    this.currentPage = 0;
    this.loadHardcodedProducts();
  }
}
