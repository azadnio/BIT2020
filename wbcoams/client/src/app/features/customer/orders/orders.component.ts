import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-customer-orders',
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
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: ``,
  styles: [``],
})
export class CustomerOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  orders: Order[] = [];
  displayedColumns = ['id', 'date', 'total', 'status', 'actions'];

  statusFilter = '';
  searchQuery = '';
  currentPage = 0;
  pageSize = 10;
  totalOrders = 0;
  isLoading = false;

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.isLoading = true;

    const params = {
      page: this.currentPage + 1,
      limit: this.pageSize,
      status: this.statusFilter || undefined,
      search: this.searchQuery || undefined,
    };

    this.orderService.getCustomerOrders(currentUser.id, params).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.totalOrders = orders.length; // In real app, this would come from the API
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.isLoading = false;
      },
    });
  }

  onFiltersChange(): void {
    this.currentPage = 0;
    this.loadOrders();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }

  clearFilters(): void {
    this.statusFilter = '';
    this.searchQuery = '';
    this.currentPage = 0;
    this.loadOrders();
  }

  viewOrder(order: Order): void {
    // Navigation handled by routerLink
  }

  cancelOrder(order: Order): void {
    if (confirm(`Are you sure you want to cancel order #${order.id}?`)) {
      this.orderService
        .updateOrder(order.id, { status: 'cancelled' })
        .subscribe({
          next: () => {
            this.loadOrders();
          },
          error: (error) => {
            console.error('Error cancelling order:', error);
          },
        });
    }
  }
}
