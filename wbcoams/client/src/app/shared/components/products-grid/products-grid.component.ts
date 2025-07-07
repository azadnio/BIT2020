import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from '../product-card/product-card.component';
import { IProductResponse } from '../../../core/models/product.model';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    ProductCardComponent,
  ],
  template: `
    <div class="products-grid-container">
      @if (loading) {
        <div class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading products...</p>
        </div>
      } @else if (products.length === 0) {
        <div class="empty-state">
          <mat-icon class="empty-icon">inventory_2</mat-icon>
          <h3>No products found</h3>
          <p>Try adjusting your filters or check back later.</p>
        </div>
      } @else {
        <div class="products-grid" [class.compact]="compact">
          @for (product of products; track product.id) {
            <app-product-card
              [product]="product"
              [compact]="compact"
              [showAddToCart]="showAddToCart"
              [showQuickView]="showQuickView"
              [showWishlist]="showWishlist"
              (productClick)="onProductClick($event)"
              (quickView)="onQuickView($event)"
              (addToWishlist)="onAddToWishlist($event)"
            ></app-product-card>
          }
        </div>

        @if (showLoadMore && hasMore) {
          <div class="load-more-container">
            <button
              mat-raised-button
              color="primary"
              (click)="onLoadMore()"
              [disabled]="loadingMore"
            >
              @if (loadingMore) {
                <mat-spinner diameter="20"></mat-spinner>
                <span>Loading...</span>
              } @else {
                <ng-container>
                  <mat-icon>expand_more</mat-icon>
                  Load More Products
                </ng-container>
              }
            </button>
          </div>
        }
      }
    </div>
  `,
  styles: [
    `
      .products-grid-container {
        width: 100%;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        color: #666;

        mat-spinner {
          margin-bottom: 16px;
        }
      }

      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        text-align: center;
        color: #666;

        .empty-icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
          color: #ccc;
          margin-bottom: 16px;
        }

        h3 {
          margin: 0 0 8px 0;
          color: #333;
        }

        p {
          margin: 0;
          max-width: 400px;
        }
      }

      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;
        padding: 0;

        &.compact {
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
      }

      .load-more-container {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        padding: 20px;

        button {
          min-width: 200px;
          height: 48px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }

      @media (max-width: 768px) {
        .products-grid {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;

          &.compact {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 12px;
          }
        }
      }

      @media (max-width: 480px) {
        .products-grid {
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 12px;

          &.compact {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 8px;
          }
        }
      }
    `,
  ],
})
export class ProductsGridComponent implements OnInit {
  @Input() products: IProductResponse[] = [];
  @Input() loading: boolean = false;
  @Input() loadingMore: boolean = false;
  @Input() compact: boolean = false;
  @Input() showAddToCart: boolean = true;
  @Input() showQuickView: boolean = true;
  @Input() showWishlist: boolean = true;
  @Input() showLoadMore: boolean = false;
  @Input() hasMore: boolean = false;

  ngOnInit(): void {
    // Component initialization logic here
  }

  onProductClick(product: IProductResponse): void {
    console.log('Product clicked:', product);
    // Navigate to product detail page
    // this.router.navigate(['/products', product.id]);
  }

  onQuickView(product: IProductResponse): void {
    console.log('Quick view:', product);
    // Open quick view modal/dialog
  }

  onAddToWishlist(product: IProductResponse): void {
    console.log('Add to wishlist:', product);
    // Add to wishlist service
  }

  onLoadMore(): void {
    console.log('Load more products');
    // Emit event to parent component to load more products
  }
}
