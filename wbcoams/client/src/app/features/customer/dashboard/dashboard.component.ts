import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { CustomerService } from '../../../core/services/customer.service';
import { OrderService } from '../../../core/services/order.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { PaymentService } from '../../../core/services/payment.service';
import { User, Customer } from '../../../core/models/user.model';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class CustomerDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private customerService = inject(CustomerService);
  private orderService = inject(OrderService);

  currentUser: User | null = null;
  customerData: Customer | null = null;
  recentOrders: Order[] = [];
  isLoadingOrders = false;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadCustomerData();
      this.loadRecentOrders();
    }
  }

  private loadCustomerData(): void {
    if (this.currentUser) {
      this.customerService.getCustomerByUserId(this.currentUser.id).subscribe({
        next: (customer) => {
          this.customerData = customer;
        },
        error: (error) => {
          console.error('Error loading customer data:', error);
        },
      });
    }
  }

  private loadRecentOrders(): void {
    if (this.currentUser) {
      this.isLoadingOrders = true;
      this.orderService
        .getCustomerOrders(this.currentUser.id, { limit: 5 })
        .subscribe({
          next: (orders) => {
            this.recentOrders = orders;
            this.isLoadingOrders = false;
          },
          error: (error) => {
            console.error('Error loading recent orders:', error);
            this.isLoadingOrders = false;
          },
        });
    }
  }
}
