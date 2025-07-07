import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary" class="customer-toolbar">
      <div class="toolbar-content">
        <div class="brand-section">
          <div class="brand-logo">
            <div class="logo-circle">
              <span class="logo-text">CH</span>
            </div>
          </div>
          <div class="brand-info">
            <h1 class="brand-name">CAPITAL HARDWARE</h1>
            <p class="brand-tagline">WHOLE SALE DEALERS OF GENERAL HARDWARE ITEMS</p>
          </div>
        </div>

        <div class="nav-section">
          <button mat-button routerLink="/customer/home" routerLinkActive="active-nav">
            <mat-icon>home</mat-icon>
            <span>Home</span>
          </button>
          <button mat-button routerLink="/products" routerLinkActive="active-nav">
            <mat-icon>inventory</mat-icon>
            <span>Items</span>
          </button>
          <button mat-button>
            <mat-icon>account_circle</mat-icon>
            <span>My Account</span>
          </button>
          <button mat-button class="logout-btn">
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
          <button mat-button>
            <mat-icon>phone</mat-icon>
            <span>Contact</span>
          </button>
          <button mat-button>
            <mat-icon>info</mat-icon>
            <span>About</span>
          </button>
          
          <button mat-button routerLink="/customer/cart" class="cart-button">
            <mat-icon [matBadge]="cart.itemCount || 0" matBadgeColor="accent" 
                      [matBadgeHidden]="!cart.itemCount">shopping_cart</mat-icon>
            <span>Cart</span>
          </button>
        </div>
      </div>
    </mat-toolbar>

    <div class="content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .customer-toolbar {
      background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      min-height: 80px;
    }

    .toolbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 8px 16px;
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .brand-logo {
      display: flex;
      align-items: center;
    }

    .logo-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .logo-text {
      font-size: 18px;
      font-weight: 700;
      color: white;
    }

    .brand-info {
      text-align: left;
    }

    .brand-name {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .brand-tagline {
      margin: 0;
      font-size: 12px;
      opacity: 0.9;
      font-weight: 300;
      letter-spacing: 0.5px;
    }

    .nav-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-section button {
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 64px;
      padding: 8px 12px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .nav-section button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .nav-section button mat-icon {
      margin-bottom: 4px;
      font-size: 18px;
    }

    .nav-section button span {
      font-size: 11px;
      line-height: 1;
    }

    .active-nav {
      background-color: rgba(255, 255, 255, 0.15) !important;
    }

    .logout-btn {
      color: #ffeb3b !important;
    }

    .cart-button {
      background-color: #ff5722 !important;
      margin-left: 16px;
    }

    .cart-button:hover {
      background-color: #f4511e !important;
    }

    .content {
      min-height: calc(100vh - 80px);
      background-color: #f8f9fa;
    }

    @media (max-width: 768px) {
      .toolbar-content {
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .nav-section {
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
      }

      .nav-section button {
        min-width: 48px;
        padding: 6px 8px;
      }

      .nav-section button span {
        font-size: 10px;
      }

      .brand-name {
        font-size: 20px;
      }

      .brand-tagline {
        font-size: 10px;
      }
    }
  `]
})
export class CustomerLayoutComponent {
  cart = this.cartService.getCart();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }
}