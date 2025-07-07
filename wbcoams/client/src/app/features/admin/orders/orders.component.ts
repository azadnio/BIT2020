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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderService } from '../../../core/services/order.service';
import { MessageService } from '../../../core/services/message.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-orders',
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
    MatTooltipModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  orders: Order[] = [];
  displayedColumns = [
    'id',
    'customer',
    'orderDate',
    'total',
    'status',
    'items',
    'actions',
  ];

  searchQuery = '';
  statusFilter = '';
  currentPage = 0;
  pageSize = 10;
  totalOrders = 0;
  isLoading = false;

  // Order statuses for filtering
  orderStatuses = [
    { value: '', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'on_hold', label: 'On Hold' }
  ];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;

    const params = {
      page: this.currentPage + 1,
      limit: this.pageSize,
      search: this.searchQuery || undefined,
      status: this.statusFilter || undefined,
    };

    this.orderService.getOrders(params).subscribe({
      next: (response) => {
        this.orders = response.orders;
        this.totalOrders = response.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.messageService.showError('Failed to load orders');
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
    this.searchQuery = '';
    this.statusFilter = '';
    this.currentPage = 0;
    this.loadOrders();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      case 'on_hold':
        return 'status-on-hold';
      default:
        return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'on_hold':
        return 'On Hold';
      default:
        return status;
    }
  }

  editOrder(order: Order): void {
    // Navigate to edit order page
    this.router.navigate(['/admin/orders', order.id, 'edit']);
  }

  viewOrder(order: Order): void {
    // Navigate to order detail page
    this.router.navigate(['/admin/orders', order.id]);
  }

  deleteOrder(order: Order): void {
    if (confirm(`Are you sure you want to delete order #${order.id}?`)) {
      this.orderService.deleteOrder(order.id).subscribe({
        next: () => {
          this.messageService.showSuccess('Order deleted successfully');
          this.loadOrders();
        },
        error: (error) => {
          console.error('Error deleting order:', error);
          this.messageService.showError('Failed to delete order');
        },
      });
    }
  }

  getTotalItems(order: Order): number {
    return order.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }
}
