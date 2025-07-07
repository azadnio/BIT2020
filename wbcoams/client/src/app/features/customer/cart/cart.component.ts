import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerLayoutComponent } from '../../../shared/layouts/customer-layout/customer-layout.component';
import { CartService, CartItem, Cart } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSnackBarModule,
    FormsModule,
    RouterLink,
    CustomerLayoutComponent
  ],
  template: `
    <app-customer-layout>
      <div class="cart-container">
        <h1 class="page-title">Shopping Cart</h1>

        @if (cart.items.length === 0) {
          <mat-card class="empty-cart">
            <mat-card-content>
              <div class="empty-state">
                <mat-icon class="empty-icon">shopping_cart</mat-icon>
                <h2>Your cart is empty</h2>
                <p>Add some items to get started</p>
                <button mat-raised-button color="primary" routerLink="/customer/home">
                  Continue Shopping
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        } @else {
          <div class="cart-content">
            <mat-card class="cart-items">
              <mat-card-header>
                <mat-card-title>Cart Items ({{ cart.itemCount }})</mat-card-title>
              </mat-card-header>
              
              <mat-card-content>
                @for (item of cart.items; track item.id) {
                  <div class="cart-item">
                    <div class="item-image">
                      @if (item.product.image) {
                        <img [src]="item.product.image" [alt]="item.product.description" class="product-image">
                      } @else {
                        <div class="product-placeholder">
                          <mat-icon>inventory</mat-icon>
                        </div>
                      }
                    </div>

                    <div class="item-details">
                      <h3 class="item-name">{{ item.product.description }}</h3>
                      <p class="item-info">{{ item.product.info }}</p>
                      <div class="item-price">
                        <span class="unit-price">LKR {{ item.price | number:'1.2-2' }} per {{ item.product.unit }}</span>
                      </div>
                    </div>

                    <div class="quantity-controls">
                      <button mat-icon-button (click)="decreaseQuantity(item)" [disabled]="item.quantity <= 1">
                        <mat-icon>remove</mat-icon>
                      </button>
                      <span class="quantity">{{ item.quantity }}</span>
                      <button mat-icon-button (click)="increaseQuantity(item)">
                        <mat-icon>add</mat-icon>
                      </button>
                    </div>

                    <div class="item-total">
                      <div class="total-price">LKR {{ (item.price * item.quantity) | number:'1.2-2' }}</div>
                      <button mat-icon-button color="warn" (click)="removeItem(item)">
                        <mat-icon>delete</mat-icon>
                      </button>
                    </div>
                  </div>
                  <mat-divider></mat-divider>
                }
              </mat-card-content>
            </mat-card>

            <mat-card class="cart-summary">
              <mat-card-header>
                <mat-card-title>Order Summary</mat-card-title>
              </mat-card-header>
              
              <mat-card-content>
                <div class="summary-row">
                  <span>Items ({{ cart.itemCount }})</span>
                  <span>LKR {{ cart.total | number:'1.2-2' }}</span>
                </div>
                
                <div class="summary-row">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                
                <mat-divider class="summary-divider"></mat-divider>
                
                <div class="summary-row total">
                  <span>Total</span>
                  <span>LKR {{ cart.total | number:'1.2-2' }}</span>
                </div>

                <div class="checkout-actions">
                  <button mat-raised-button color="primary" class="checkout-btn" (click)="proceedToCheckout()">
                    <mat-icon>shopping_cart_checkout</mat-icon>
                    Proceed to Checkout
                  </button>
                  
                  <button mat-button (click)="clearCart()" class="clear-cart-btn">
                    <mat-icon>delete_sweep</mat-icon>
                    Clear Cart
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        }
      </div>
    </app-customer-layout>
  `,
  styles: [`
    /* ========================================
       CSS CUSTOM PROPERTIES (VARIABLES)
       ======================================== */
    :host {
      /* Spacing Variables */
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 12px;
      --spacing-lg: 16px;
      --spacing-xl: 24px;
      --spacing-2xl: 40px;
      --spacing-3xl: 48px;
      --spacing-4xl: 64px;

      /* Container Variables */
      --container-max-width: 1200px;
      --sidebar-width: 300px;
      --item-image-size: 80px;
      --item-image-size-mobile: 60px;

      /* Color Variables */
      --color-primary: #1976d2;
      --color-danger: #f44336;
      --color-text-primary: #333;
      --color-text-secondary: #666;
      --color-text-muted: #999;
      --color-text-light: #ccc;
      --color-background-light: #f5f5f5;
      --color-border-light: #ddd;

      /* Border Radius */
      --border-radius-sm: 4px;

      /* Font Sizes */
      --font-size-xs: 11px;
      --font-size-sm: 12px;
      --font-size-md: 14px;
      --font-size-lg: 16px;
      --font-size-xl: 18px;
      --font-size-2xl: 64px;

      /* Font Weights */
      --font-weight-normal: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;

      /* Line Heights */
      --line-height-tight: 1.4;

      /* Button Heights */
      --button-height-standard: 48px;

      /* Breakpoints */
      --breakpoint-mobile: 768px;
    }

    /* ========================================
       REUSABLE UTILITY CLASSES
       ======================================== */
    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .flex-between {
      display: flex;
      justify-content: space-between;
    }

    .flex-column {
      display: flex;
      flex-direction: column;
    }

    .full-width {
      width: 100%;
    }

    .full-size {
      width: 100%;
      height: 100%;
    }

    .text-center {
      text-align: center;
    }

    .fit-content {
      height: fit-content;
    }

    /* ========================================
       BASE STYLES & LAYOUT
       ======================================== */
    .cart-container {
      max-width: var(--container-max-width);
      margin: 0 auto;
      padding: var(--spacing-xl);
    }

    .page-title {
      margin-bottom: var(--spacing-xl);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-semibold);
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr var(--sidebar-width);
      gap: var(--spacing-xl);
    }

    /* ========================================
       EMPTY CART STATE
       ======================================== */
    .empty-cart {
      margin-top: var(--spacing-2xl);
    }

    .empty-state {
      padding: var(--spacing-2xl);
      text-align: center;
    }

    .empty-icon {
      font-size: var(--font-size-2xl);
      width: var(--font-size-2xl);
      height: var(--font-size-2xl);
      color: var(--color-text-light);
      margin-bottom: var(--spacing-lg);
    }

    .empty-state h2 {
      margin: 0 0 var(--spacing-sm) 0;
      color: var(--color-text-secondary);
    }

    .empty-state p {
      margin: 0 0 var(--spacing-xl) 0;
      color: var(--color-text-muted);
    }

    /* ========================================
       CART ITEMS SECTION
       ======================================== */
    .cart-items {
      height: fit-content;
    }

    .cart-item {
      display: grid;
      grid-template-columns: var(--item-image-size) 1fr auto auto;
      gap: var(--spacing-lg);
      align-items: center;
      padding: var(--spacing-lg) 0;
    }

    /* ========================================
       PRODUCT IMAGE STYLES
       ======================================== */
    .item-image {
      width: var(--item-image-size);
      height: var(--item-image-size);
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--border-radius-sm);
    }

    .product-placeholder {
      width: 100%;
      height: 100%;
      background-color: var(--color-background-light);
      border-radius: var(--border-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-muted);
    }

    /* ========================================
       ITEM DETAILS STYLES
       ======================================== */
    .item-details {
      flex: 1;
    }

    .item-name {
      margin: 0 0 var(--spacing-xs) 0;
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
    }

    .item-info {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: var(--font-size-md);
      color: var(--color-text-secondary);
      line-height: var(--line-height-tight);
    }

    .unit-price {
      font-size: var(--font-size-md);
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
    }

    /* ========================================
       QUANTITY CONTROLS
       ======================================== */
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      border: 1px solid var(--color-border-light);
      border-radius: var(--border-radius-sm);
      padding: var(--spacing-xs);
    }

    .quantity {
      min-width: 32px;
      text-align: center;
      font-weight: var(--font-weight-medium);
    }

    /* ========================================
       ITEM TOTAL SECTION
       ======================================== */
    .item-total {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--spacing-sm);
    }

    .total-price {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
    }

    /* ========================================
       CART SUMMARY SECTION
       ======================================== */
    .cart-summary {
      height: fit-content;
      position: sticky;
      top: var(--spacing-xl);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--spacing-md);
      font-size: var(--font-size-md);
    }

    .summary-row.total {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
    }

    .summary-divider {
      margin: var(--spacing-lg) 0;
    }

    /* ========================================
       CHECKOUT ACTIONS
       ======================================== */
    .checkout-actions {
      margin-top: var(--spacing-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .checkout-btn {
      width: 100%;
      height: var(--button-height-standard);
      font-weight: var(--font-weight-semibold);
    }

    .clear-cart-btn {
      width: 100%;
      color: var(--color-danger);
    }

    /* ========================================
       RESPONSIVE DESIGN
       ======================================== */
    @media (max-width: var(--breakpoint-mobile)) {
      .cart-container {
        padding: var(--spacing-lg);
      }

      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-item {
        grid-template-columns: var(--item-image-size-mobile) 1fr;
        grid-template-rows: auto auto;
        gap: var(--spacing-md);
      }

      .item-image {
        width: var(--item-image-size-mobile);
        height: var(--item-image-size-mobile);
      }

      .quantity-controls {
        grid-column: 1 / -1;
        justify-self: start;
      }

      .item-total {
        grid-column: 1 / -1;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], total: 0, itemCount: 0 };

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
    this.snackBar.open(`${item.product.description} removed from cart`, 'Close', {
      duration: 3000
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.snackBar.open('Cart cleared', 'Close', {
      duration: 3000
    });
  }

  proceedToCheckout(): void {
    // Mock checkout process
    this.snackBar.open('Checkout functionality will be implemented', 'Close', {
      duration: 3000
    });
  }
}