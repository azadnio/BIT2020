import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

interface DashboardStats {
  totalCustomers: number;
  totalProducts: number;
  pendingOrders: number;
  monthlyRevenue: number;
  newOrdersToday: number;
  pendingPayments: number;
  totalMessages: number;
  unreadMessages: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  private loadDashboardStats(): void {
    this.isLoading = true;
    // Mock data for now - replace with actual API calls
    setTimeout(() => {
      this.stats = {
        totalCustomers: 25,
        totalProducts: 150,
        pendingOrders: 8,
        monthlyRevenue: 250000,
        newOrdersToday: 3,
        pendingPayments: 5,
        totalMessages: 12,
        unreadMessages: 3,
      };
      this.isLoading = false;
    }, 1000);
  }
}
