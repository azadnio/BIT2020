// // Example usage in a home page or products page component

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ProductCardComponent } from '../product-card/product-card.component';
// // import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
// // import { ProductsGridComponent } from '../shared/components/products-grid/products-grid.component';

// // import { ProductService } from '../core/services/product.service';
// // import { Product } from '../core/models/product.model';
// import { ProductsGridComponent } from '../products-grid/products-grid.component';
// import { Product } from '@core/models/product.model';
// import { ProductService } from '@core/services/product.service';

// @Component({
//   selector: 'app-example-usage',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ProductCardComponent,
//     ProductsGridComponent,
//   ],
//   template: `
//     <div class="page-container">
//       <!-- Section 1: Featured Products (using individual cards) -->
//       <section class="featured-section">
//         <h2>Featured Products</h2>
//         <div class="featured-grid">
//           @for (product of featuredProducts; track product.id) {
//             <app-product-card
//               [product]="product"
//               [showAddToCart]="true"
//               [showQuickView]="true"
//               [showWishlist]="true"
//               (productClick)="navigateToProduct($event)"
//               (quickView)="openQuickView($event)"
//               (addToWishlist)="addToWishlist($event)"
//             ></app-product-card>
//           }
//         </div>
//       </section>

//       <!-- Section 2: All Products (using products grid) -->
//       <section class="products-section">
//         <h2>All Products</h2>
//         <app-products-grid
//           [products]="allProducts"
//           [loading]="loading"
//           [loadingMore]="loadingMore"
//           [compact]="false"
//           [showAddToCart]="true"
//           [showQuickView]="true"
//           [showWishlist]="true"
//           [showLoadMore]="true"
//           [hasMore]="hasMoreProducts"
//         ></app-products-grid>
//       </section>

//       <!-- Section 3: Compact Grid Example -->
//       <section class="compact-section">
//         <h2>Quick Browse</h2>
//         <app-products-grid
//           [products]="quickBrowseProducts"
//           [loading]="false"
//           [compact]="true"
//           [showAddToCart]="true"
//           [showQuickView]="false"
//           [showWishlist]="false"
//           [showLoadMore]="false"
//         ></app-products-grid>
//       </section>
//     </div>
//   `,
//   styles: [`
//     .page-container {
//       max-width: 1200px;
//       margin: 0 auto;
//       padding: 24px;
//     }

//     .featured-section,
//     .products-section,
//     .compact-section {
//       margin-bottom: 48px;
//     }

//     h2 {
//       margin-bottom: 24px;
//       font-size: 1.8rem;
//       font-weight: 600;
//       color: #333;
//     }

//     .featured-grid {
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//       gap: 24px;
//       margin-bottom: 32px;
//     }

//     @media (max-width: 768px) {
//       .page-container {
//         padding: 16px;
//       }

//       .featured-grid {
//         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//         gap: 16px;
//       }
//     }
//   `]
// })
// export class ExampleUsageComponent implements OnInit {
//   featuredProducts: Product[] = [];
//   allProducts: Product[] = [];
//   quickBrowseProducts: Product[] = [];
//   loading = false;
//   loadingMore = false;
//   hasMoreProducts = true;

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.loadFeaturedProducts();
//     this.loadAllProducts();
//     this.loadQuickBrowseProducts();
//   }

//   loadFeaturedProducts(): void {
//     // Load featured products
//     this.productService.getFeaturedProducts().subscribe({
//       next: (products) => {
//         this.featuredProducts = products;
//       },
//       error: (error) => {
//         console.error('Error loading featured products:', error);
//       }
//     });
//   }

//   loadAllProducts(): void {
//     this.loading = true;
//     this.productService.getProducts().subscribe({
//       next: (response) => {
//         this.allProducts = response.products || response;
//         this.loading = false;
//       },
//       error: (error) => {
//         console.error('Error loading products:', error);
//         this.loading = false;
//       }
//     });
//   }

//   loadQuickBrowseProducts(): void {
//     // Load a smaller set for quick browse
//     this.productService.getProducts({ limit: 8 }).subscribe({
//       next: (response) => {
//         this.quickBrowseProducts = response.products || response;
//       },
//       error: (error) => {
//         console.error('Error loading quick browse products:', error);
//       }
//     });
//   }

//   navigateToProduct(product: Product): void {
//     console.log('Navigate to product:', product);
//     // Implement navigation to product detail page
//     // this.router.navigate(['/products', product.id]);
//   }

//   openQuickView(product: Product): void {
//     console.log('Open quick view for:', product);
//     // Implement quick view modal/dialog
//   }

//   addToWishlist(product: Product): void {
//     console.log('Add to wishlist:', product);
//     // Implement wishlist functionality
//   }
// }

// /*
// USAGE INSTRUCTIONS:

// 1. Import the ProductCardComponent in your page components:
//    imports: [ProductCardComponent]

// 2. Use individual cards for featured sections:
//    <app-product-card
//      [product]="product"
//      [showAddToCart]="true"
//      [showQuickView]="true"
//      [showWishlist]="true"
//      (productClick)="navigateToProduct($event)"
//      (quickView)="openQuickView($event)"
//      (addToWishlist)="addToWishlist($event)"
//    ></app-product-card>

// 3. Use ProductsGridComponent for product listings:
//    <app-products-grid
//      [products]="products"
//      [loading]="loading"
//      [compact]="false"
//      [showAddToCart]="true"
//    ></app-products-grid>

// 4. Available Input Properties:
//    - product: Product (required)
//    - showAddToCart: boolean (default: true)
//    - showQuickView: boolean (default: true)
//    - showWishlist: boolean (default: true)
//    - compact: boolean (default: false) - for smaller cards

// 5. Available Output Events:
//    - productClick: Emitted when card is clicked
//    - quickView: Emitted when quick view button is clicked
//    - addToWishlist: Emitted when wishlist button is clicked

// 6. Features:
//    - Responsive design
//    - Discount badges and calculations
//    - Product image with fallback
//    - Add to cart functionality
//    - Hover effects and animations
//    - Brand and category display
//    - New product badges
//    - Out of stock states
// */
