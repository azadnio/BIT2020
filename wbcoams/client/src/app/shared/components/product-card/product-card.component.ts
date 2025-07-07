import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { Product } from '../../../core/models/product.model';
// import {IItem} from '@sharedlib/interfaces/item.interface'; // Adjust the import path as necessary
import { IProductResponse } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: IProductResponse;
  @Input() showAddToCart: boolean = true;
  @Input() showQuickView: boolean = true;
  @Input() showWishlist: boolean = true;
  @Input() compact: boolean = false; // For smaller cards in grids
  @Output() productClick = new EventEmitter<IProductResponse>();
  @Output() quickView = new EventEmitter<IProductResponse>();
  @Output() addToWishlist = new EventEmitter<IProductResponse>();

  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  onProductClick(): void {
    this.productClick.emit(this.product);
  }

  onQuickView(event: Event): void {
    event.stopPropagation();
    this.quickView.emit(this.product);
  }

  onAddToWishlist(event: Event): void {
    event.stopPropagation();
    this.addToWishlist.emit(this.product);
  }

  addToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.product, 1);
    this.snackBar.open(
      `${this.product.description} added to cart`,
      'View Cart',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      },
    );
  }

  get hasDiscount(): boolean {
    return !!(
      this.product.oldPrice && this.product.oldPrice > this.product.price
    );
  }

  get discountPercentage(): number {
    if (!this.hasDiscount) return 0;
    return Math.round(
      ((this.product.oldPrice! - this.product.price) / this.product.oldPrice!) *
        100,
    );
  }

  get discountAmount(): number {
    if (!this.hasDiscount) return 0;
    return this.product.oldPrice! - this.product.price;
  }

  get isNew(): boolean {
    const createdDate = new Date(this.product.createdAt);
    const now = new Date();
    const daysDiff =
      (now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
    return daysDiff <= 30; // Products created within 30 days are considered "new"
  }

  get isOutOfStock(): boolean {
    // This would typically come from inventory data
    // For now, we'll assume all products are in stock
    return false;
  }

  get productImage(): string {
    return '/uploads/products/15-1750799830479.jpg';
    return this.product.image || '/assets/images/product-placeholder.png';
  }

  get brandName(): string {
    return this.product?.brandName || 'Unknown Brand';
  }

  get categoryName(): string {
    return this.product?.categoryName || 'Uncategorized';
  }
}
