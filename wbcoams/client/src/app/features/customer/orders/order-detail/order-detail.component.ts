import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { OrderService } from '../../../../core/services/order.service';
import { Order, OrderItem } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  template: `
    <div class="order-detail-container">
      @if (isLoading) {
        <div class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading order details...</p>
        </div>
      } @else if (order) {
        <!-- Header -->
        <div class="order-header">
          <div class="header-content">
            <button
              mat-icon-button
              routerLink="/customer/orders"
              class="back-btn"
            >
              <mat-icon>arrow_back</mat-icon>
            </button>
            <div class="order-title">
              <h1>Order #{{ order.id }}</h1>
              <mat-chip [class]="'status-' + order.status">
                {{ order.status | titlecase }}
              </mat-chip>
            </div>
          </div>
        </div>

        <!-- Order Information -->
        <mat-card class="order-info-card">
          <mat-card-header>
            <mat-card-title>Order Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="order-info-grid">
              <div class="info-item">
                <mat-icon>schedule</mat-icon>
                <div>
                  <strong>Order Date</strong>
                  <p>{{ order.orderDate | date: 'full' }}</p>
                </div>
              </div>

              <div class="info-item">
                <mat-icon>attach_money</mat-icon>
                <div>
                  <strong>Total Amount</strong>
                  <p class="amount">Rs. {{ order.total | number: '1.2-2' }}</p>
                </div>
              </div>

              <div class="info-item">
                <mat-icon>info</mat-icon>
                <div>
                  <strong>Status</strong>
                  <p>{{ order.status | titlecase }}</p>
                </div>
              </div>

              @if (order.remarks) {
                <div class="info-item full-width">
                  <mat-icon>note</mat-icon>
                  <div>
                    <strong>Remarks</strong>
                    <p>{{ order.remarks }}</p>
                  </div>
                </div>
              }
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Order Items -->
        <mat-card class="order-items-card">
          <mat-card-header>
            <mat-card-title>Order Items</mat-card-title>
            <mat-card-subtitle>
              {{ order.items?.length || 0 }} item(s)
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            @if (order.items && order.items.length > 0) {
              <!-- Desktop Table -->
              <div class="desktop-view">
                <mat-table [dataSource]="order.items" class="items-table">
                  <ng-container matColumnDef="product">
                    <mat-header-cell *matHeaderCellDef>Product</mat-header-cell>
                    <mat-cell *matCellDef="let item">
                      <div class="product-cell">
                        <div class="product-image">
                          @if (item.product?.image) {
                            <img
                              [src]="item.product.image"
                              [alt]="item.product.description"
                            />
                          } @else {
                            <mat-icon>image</mat-icon>
                          }
                        </div>
                        <div class="product-details">
                          <strong>{{
                            item.product?.description || 'Unknown Product'
                          }}</strong>
                          <p>{{ item.product?.info || 'No description' }}</p>
                        </div>
                      </div>
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="quantity">
                    <mat-header-cell *matHeaderCellDef
                      >Quantity</mat-header-cell
                    >
                    <mat-cell *matCellDef="let item">
                      <strong>{{ item.quantity }}</strong>
                      {{ item.product?.unit || 'pcs' }}
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="price">
                    <mat-header-cell *matHeaderCellDef
                      >Unit Price</mat-header-cell
                    >
                    <mat-cell *matCellDef="let item">
                      Rs. {{ item.price | number: '1.2-2' }}
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="total">
                    <mat-header-cell *matHeaderCellDef>Total</mat-header-cell>
                    <mat-cell *matCellDef="let item">
                      <strong
                        >Rs.
                        {{
                          item.quantity * item.price | number: '1.2-2'
                        }}</strong
                      >
                    </mat-cell>
                  </ng-container>

                  <mat-header-row
                    *matHeaderRowDef="itemColumns"
                  ></mat-header-row>
                  <mat-row *matRowDef="let row; columns: itemColumns"></mat-row>
                </mat-table>
              </div>

              <!-- Mobile Cards -->
              <div class="mobile-view">
                @for (item of order.items; track item.id) {
                  <div class="item-card">
                    <div class="item-header">
                      <div class="product-image">
                        @if (item.product?.image) {
                          <img
                            [src]="item.product?.image"
                            [alt]="item.product?.description"
                          />
                        } @else {
                          <mat-icon>image</mat-icon>
                        }
                      </div>
                      <div class="product-info">
                        <h4>
                          {{ item.product?.description || 'Unknown Product' }}
                        </h4>
                        <p>{{ item.product?.info || 'No description' }}</p>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div class="item-details">
                      <div class="detail-row">
                        <span>Quantity:</span>
                        <strong
                          >{{ item.quantity }}
                          {{ item.product?.unit || 'pcs' }}</strong
                        >
                      </div>
                      <div class="detail-row">
                        <span>Unit Price:</span>
                        <span>Rs. {{ item.price | number: '1.2-2' }}</span>
                      </div>
                      <div class="detail-row total-row">
                        <span>Total:</span>
                        <strong
                          >Rs.
                          {{
                            item.quantity * item.price | number: '1.2-2'
                          }}</strong
                        >
                      </div>
                    </div>
                  </div>
                }
              </div>

              <!-- Order Summary -->
              <div class="order-summary">
                <mat-divider></mat-divider>
                <div class="summary-content">
                  <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>Rs. {{ calculateSubtotal() | number: '1.2-2' }}</span>
                  </div>
                  <div class="summary-row total-row">
                    <strong>Total Amount:</strong>
                    <strong class="total-amount"
                      >Rs. {{ order.total | number: '1.2-2' }}</strong
                    >
                  </div>
                </div>
              </div>
            } @else {
              <div class="no-items">
                <mat-icon>shopping_cart</mat-icon>
                <p>No items found in this order</p>
              </div>
            }
          </mat-card-content>
        </mat-card>

        <!-- Actions -->
        <div class="order-actions">
          @if (order.status === 'pending') {
            <button mat-raised-button color="warn" (click)="cancelOrder()">
              <mat-icon>cancel</mat-icon>
              Cancel Order
            </button>
          }
          <button mat-stroked-button (click)="printOrder()">
            <mat-icon>print</mat-icon>
            Print Order
          </button>
          <button mat-button routerLink="/customer/orders">
            <mat-icon>arrow_back</mat-icon>
            Back to Orders
          </button>
        </div>
      } @else {
        <div class="error-state">
          <mat-icon>error</mat-icon>
          <h3>Order not found</h3>
          <p>
            The requested order could not be found or you don't have permission
            to view it.
          </p>
          <button
            mat-raised-button
            color="primary"
            routerLink="/customer/orders"
          >
            Back to Orders
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .order-detail-container {
        padding: 24px;
        max-width: 1000px;
        margin: 0 auto;
      }

      .loading-container,
      .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 64px 24px;
        color: #666;
        text-align: center;
      }

      .loading-container mat-spinner,
      .error-state mat-icon {
        margin-bottom: 16px;
      }

      .error-state mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #f44336;
      }

      .order-header {
        margin-bottom: 24px;
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        background: linear-gradient(135deg, #3f51b5 0%, #2196f3 100%);
        color: white;
        border-radius: 12px;
      }

      .back-btn {
        color: white;
      }

      .order-title {
        display: flex;
        align-items: center;
        gap: 16px;
        flex: 1;
      }

      .order-title h1 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 600;
      }

      .order-info-card,
      .order-items-card {
        margin-bottom: 24px;
        border-radius: 12px;
      }

      .order-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;
      }

      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }

      .info-item.full-width {
        grid-column: 1 / -1;
      }

      .info-item mat-icon {
        color: #3f51b5;
        margin-top: 2px;
      }

      .info-item strong {
        display: block;
        margin-bottom: 4px;
        color: #2c3e50;
        font-size: 0.9rem;
      }

      .info-item p {
        margin: 0;
        color: #666;
      }

      .amount {
        font-size: 1.2rem !important;
        font-weight: 600 !important;
        color: #2e7d32 !important;
      }

      .desktop-view {
        display: block;
      }

      .mobile-view {
        display: none;
      }

      .items-table {
        width: 100%;
      }

      .product-cell {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .product-image {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .product-image mat-icon {
        color: #999;
      }

      .product-details strong {
        display: block;
        margin-bottom: 4px;
        color: #2c3e50;
      }

      .product-details p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
      }

      .item-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        margin-bottom: 16px;
        overflow: hidden;
      }

      .item-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
      }

      .product-info h4 {
        margin: 0 0 4px 0;
        color: #2c3e50;
      }

      .product-info p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
      }

      .item-details {
        padding: 16px;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .detail-row.total-row {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #e0e0e0;
      }

      .order-summary {
        margin-top: 24px;
      }

      .summary-content {
        padding: 16px 0;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .summary-row.total-row {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 2px solid #e0e0e0;
      }

      .total-amount {
        font-size: 1.2rem;
        color: #2e7d32;
      }

      .no-items {
        text-align: center;
        padding: 48px;
        color: #666;
      }

      .no-items mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        margin-bottom: 12px;
        color: #ddd;
      }

      .order-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 24px;
      }

      .status-pending {
        background-color: #fff3e0 !important;
        color: #e65100 !important;
      }

      .status-completed {
        background-color: #e8f5e8 !important;
        color: #2e7d32 !important;
      }

      .status-cancelled {
        background-color: #ffebee !important;
        color: #c62828 !important;
      }

      .status-on_hold {
        background-color: #f3e5f5 !important;
        color: #7b1fa2 !important;
      }

      @media (max-width: 768px) {
        .order-detail-container {
          padding: 16px;
        }

        .header-content {
          flex-direction: column;
          text-align: center;
          gap: 12px;
        }

        .order-title {
          flex-direction: column;
          gap: 8px;
        }

        .order-title h1 {
          font-size: 1.5rem;
        }

        .order-info-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .desktop-view {
          display: none;
        }

        .mobile-view {
          display: block;
        }

        .order-actions {
          flex-direction: column;
          align-items: stretch;
        }
      }
    `,
  ],
})
export class OrderDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order: Order | null = null;
  itemColumns = ['product', 'quantity', 'price', 'total'];
  isLoading = false;

  ngOnInit(): void {
    this.loadOrderDetail();
  }

  private loadOrderDetail(): void {
    const orderId = this.route.snapshot.params['id'];
    if (orderId) {
      this.isLoading = true;
      this.orderService.getOrder(+orderId).subscribe({
        next: (order) => {
          this.order = order;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading order detail:', error);
          this.isLoading = false;
        },
      });
    }
  }

  calculateSubtotal(): number {
    if (!this.order?.items) return 0;
    return this.order.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
  }

  cancelOrder(): void {
    if (
      this.order &&
      confirm(`Are you sure you want to cancel order #${this.order.id}?`)
    ) {
      this.orderService
        .updateOrder(this.order.id, { status: 'cancelled' })
        .subscribe({
          next: (updatedOrder) => {
            this.order = updatedOrder;
          },
          error: (error) => {
            console.error('Error cancelling order:', error);
          },
        });
    }
  }

  printOrder(): void {
    window.print();
  }
}
