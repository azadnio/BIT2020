import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CustomerLayoutComponent } from '../../../shared/layouts/customer-layout/customer-layout.component';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    CustomerLayoutComponent
  ],
  template: `
    <app-customer-layout>
      <div class="home-container">
        <!-- Special Offers Section -->
        <section class="products-section">
          <h2 class="section-title">Special offers</h2>
          <div class="products-grid">
            @for (product of specialOffers; track product.id) {
              <div class="product-card">
                <div class="product-header">
                  <h3 class="product-name">{{ product.description }}</h3>
                  <div class="price-container">
                    @if (product.oldPrice && product.oldPrice > product.price) {
                      <span class="old-price">Rs. {{ product.oldPrice | number:'1.0-0' }}</span>
                    }
                    <span class="current-price">Rs. {{ product.price | number:'1.0-0' }}</span>
                  </div>
                </div>

                <div class="product-image-container">
                  @if (product.image) {
                    <img [src]="product.image" [alt]="product.description" class="product-image">
                  } @else {
                    <div class="product-placeholder">
                      <mat-icon>{{ getProductIcon(product.description) }}</mat-icon>
                    </div>
                  }
                </div>

                <div class="product-content">
                  <p class="product-description">{{ product.info }}</p>
                  
                  @if (product.oldPrice && product.oldPrice > product.price) {
                    <div class="sale-info">
                      <mat-chip class="sale-chip">Stock clearance sale</mat-chip>
                    </div>
                  }

                  <button mat-raised-button color="primary" class="add-to-order-btn" 
                          (click)="addToCart(product)">
                    <mat-icon>add_shopping_cart</mat-icon>
                    ADD TO ORDER
                  </button>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- New Arrivals Section -->
        <section class="products-section">
          <h2 class="section-title">New Arrivals</h2>
          <div class="products-grid">
            @for (product of newArrivals; track product.id) {
              <div class="product-card">
                <div class="product-header">
                  <h3 class="product-name">{{ product.description }}</h3>
                  <div class="price-container">
                    <span class="current-price">Rs. {{ product.price | number:'1.0-0' }}</span>
                  </div>
                </div>

                <div class="product-image-container">
                  @if (product.image) {
                    <img [src]="product.image" [alt]="product.description" class="product-image">
                  } @else {
                    <div class="product-placeholder">
                      <mat-icon>{{ getProductIcon(product.description) }}</mat-icon>
                    </div>
                  }
                </div>

                <div class="product-content">
                  <p class="product-description">{{ product.info }}</p>

                  <button mat-raised-button color="primary" class="add-to-order-btn" 
                          (click)="addToCart(product)">
                    <mat-icon>add_shopping_cart</mat-icon>
                    ADD TO ORDER
                  </button>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Door Locks Section -->
        <section class="products-section">
          <div class="section-header">
            <h2 class="section-title">Door locks</h2>
            <a href="/products?category=door-locks" class="view-all-link">View all</a>
          </div>
          <div class="products-grid">
            @for (product of doorLocks; track product.id) {
              <div class="product-card">
                <div class="product-header">
                  <h3 class="product-name">{{ product.description }}</h3>
                  <div class="price-container">
                    <span class="current-price">Rs. {{ product.price | number:'1.0-0' }}</span>
                  </div>
                </div>

                <div class="product-image-container">
                  @if (product.image) {
                    <img [src]="product.image" [alt]="product.description" class="product-image">
                  } @else {
                    <div class="product-placeholder">
                      <mat-icon>lock</mat-icon>
                    </div>
                  }
                </div>

                <div class="product-content">
                  <p class="product-description">{{ product.info }}</p>

                  <button mat-raised-button color="primary" class="add-to-order-btn" 
                          (click)="addToCart(product)">
                    <mat-icon>add_shopping_cart</mat-icon>
                    ADD TO ORDER
                  </button>
                </div>
              </div>
            }
          </div>
        </section>
      </div>
    </app-customer-layout>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }

    .products-section {
      margin-bottom: 48px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .section-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #2c5aa0;
      margin: 0 0 24px 0;
      text-transform: capitalize;
    }

    .view-all-link {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
    }

    .view-all-link:hover {
      text-decoration: underline;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    .product-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .product-header {
      padding: 12px;
      border-bottom: 1px solid #f0f0f0;
    }

    .product-name {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: #2c5aa0;
      line-height: 1.3;
    }

    .price-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .old-price {
      color: #999;
      text-decoration: line-through;
      font-size: 12px;
    }

    .current-price {
      color: #1976d2;
      font-weight: 600;
      font-size: 16px;
    }

    .product-image-container {
      height: 120px;
      overflow: hidden;
      background-color: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      color: #999;
    }

    .product-placeholder mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .product-content {
      padding: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .product-description {
      color: #666;
      font-size: 12px;
      margin: 0 0 12px 0;
      line-height: 1.4;
      flex: 1;
    }

    .sale-info {
      margin-bottom: 12px;
    }

    .sale-chip {
      background-color: #fff3e0;
      color: #f57c00;
      font-size: 11px;
      height: 20px;
      font-weight: 500;
    }

    .add-to-order-btn {
      width: 100%;
      height: 36px;
      font-weight: 600;
      font-size: 12px;
      background-color: #1976d2;
      margin-top: auto;
    }

    .add-to-order-btn:hover {
      background-color: #1565c0;
    }

    .add-to-order-btn mat-icon {
      margin-right: 4px;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .home-container {
        padding: 16px;
      }

      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 16px;
      }

      .section-title {
        font-size: 1.5rem;
      }

      .product-name {
        font-size: 13px;
      }

      .current-price {
        font-size: 14px;
      }

      .product-image-container {
        height: 100px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  specialOffers: Product[] = [];
  newArrivals: Product[] = [];
  doorLocks: Product[] = [];

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Mock data based on the database and images shown
    this.specialOffers = [
      {
        id: 1,
        description: 'Shangai Door Lock',
        info: 'Brass cauted door handles',
        categoryId: 1,
        price: 1250,
        oldPrice: 1500,
        brandId: 1,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 2,
        description: 'Jtech Handrill',
        info: 'Professional grade handrill',
        categoryId: 2,
        price: 1000,
        oldPrice: 1200,
        brandId: 1,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 3,
        description: 'Siver coat Tap',
        info: 'High quality silver coating',
        categoryId: 3,
        price: 1000,
        oldPrice: 1200,
        brandId: 2,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 4,
        description: 'Tile Cutter',
        info: 'Professional tile cutting tool',
        categoryId: 3,
        price: 1000,
        oldPrice: 1200,
        brandId: 1,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 5,
        description: 'Brass Door guard',
        info: 'Security door chain guard',
        categoryId: 1,
        price: 400,
        oldPrice: 490,
        brandId: 2,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 6,
        description: 'Alexa Door Lock',
        info: 'Smart door lock system',
        categoryId: 1,
        price: 1550,
        oldPrice: 1650,
        brandId: 1,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      }
    ];

    this.newArrivals = [
      {
        id: 7,
        description: 'Brass Stay',
        info: 'Top quality lankan brass widow stay',
        categoryId: 1,
        price: 200,
        brandId: 2,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 8,
        description: 'Crocodile Hoe',
        info: 'No1 Original Corocodile hoe',
        categoryId: 2,
        price: 1000,
        brandId: 1,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 9,
        description: 'Concrete Nail 2\'',
        info: 'Imported Concrete naile',
        categoryId: 2,
        price: 175,
        brandId: 1,
        unit: 'Packet',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 10,
        description: 'Brass Door guard',
        info: 'Srilankan hand made oxidized',
        categoryId: 1,
        price: 490,
        brandId: 2,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 11,
        description: 'Gate Lock',
        info: 'Nickle quated gate locks',
        categoryId: 1,
        price: 270,
        brandId: 2,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 12,
        description: 'Tile Cutter 12\'',
        info: 'Chinese tile cutter',
        categoryId: 3,
        price: 900,
        brandId: 1,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      }
    ];

    this.doorLocks = [
      {
        id: 13,
        description: 'Premium Door Lock Set',
        info: 'Complete door lock with keys',
        categoryId: 1,
        price: 2500,
        brandId: 1,
        unit: 'Set',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 14,
        description: 'Security Padlock',
        info: 'Heavy duty security padlock',
        categoryId: 1,
        price: 850,
        brandId: 2,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      },
      {
        id: 15,
        description: 'Digital Door Lock',
        info: 'Keyless entry digital lock',
        categoryId: 1,
        price: 5500,
        brandId: 1,
        unit: 'Nos',
        isActive: true,
        createdAt: '',
        createdUserId: 1,
        updatedAt: '',
        updatedUserId: 1
      }
    ];
  }

  getProductIcon(productName: string): string {
    const name = productName.toLowerCase();
    if (name.includes('lock') || name.includes('door')) return 'lock';
    if (name.includes('drill') || name.includes('handrill')) return 'construction';
    if (name.includes('tap') || name.includes('faucet')) return 'water_drop';
    if (name.includes('cutter') || name.includes('tile')) return 'content_cut';
    if (name.includes('nail') || name.includes('concrete')) return 'build';
    if (name.includes('hoe') || name.includes('crocodile')) return 'agriculture';
    if (name.includes('stay') || name.includes('brass')) return 'hardware';
    if (name.includes('guard')) return 'security';
    return 'inventory';
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    this.snackBar.open(`${product.description} added to cart`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}