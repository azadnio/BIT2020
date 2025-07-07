import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule
  ],
  template: `
    <div class="dashboard-container">
      <h1 class="page-title">Dashboard</h1>
      
      <mat-grid-list [cols]="breakpoint" rowHeight="200px" gutterSize="24px">
        @for (card of dashboardCards; track card.title) {
          <mat-grid-tile>
            <mat-card class="dashboard-card">
              <mat-card-content>
                <div class="card-header">
                  <mat-icon [class]="card.iconClass">{{ card.icon }}</mat-icon>
                  <div class="card-info">
                    <h3 class="card-title">{{ card.title }}</h3>
                    <p class="card-value">{{ card.value }}</p>
                  </div>
                </div>
                <p class="card-description">{{ card.description }}</p>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
        }
      </mat-grid-list>

      <div class="recent-activities">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Recent Activities</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            @for (activity of recentActivities; track activity.id) {
              <div class="activity-item">
                <mat-icon class="activity-icon">{{ activity.icon }}</mat-icon>
                <div class="activity-content">
                  <p class="activity-description">{{ activity.description }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            }
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-title {
      margin-bottom: 24px;
      color: #333;
      font-weight: 500;
    }

    .dashboard-card {
      width: 100%;
      height: 100%;
      transition: transform 0.2s ease-in-out;
    }

    .dashboard-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .card-info {
      margin-left: 16px;
    }

    .card-title {
      margin: 0;
      font-size: 14px;
      font-weight: 500;
      color: #666;
    }

    .card-value {
      margin: 4px 0 0 0;
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .card-description {
      margin: 0;
      font-size: 12px;
      color: #999;
    }

    .icon-customers { color: #4CAF50; }
    .icon-products { color: #FF9800; }
    .icon-orders { color: #2196F3; }
    .icon-revenue { color: #9C27B0; }

    .recent-activities {
      margin-top: 32px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      margin-right: 16px;
      color: #666;
    }

    .activity-content {
      flex: 1;
    }

    .activity-description {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #333;
    }

    .activity-time {
      font-size: 12px;
      color: #999;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 0 16px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  breakpoint = 4;
  
  dashboardCards = [
    {
      title: 'Total Customers',
      value: '156',
      icon: 'people',
      iconClass: 'icon-customers',
      description: 'Active customers'
    },
    {
      title: 'Products',
      value: '342',
      icon: 'inventory',
      iconClass: 'icon-products',
      description: 'Available products'
    },
    {
      title: 'Orders Today',
      value: '23',
      icon: 'shopping_cart',
      iconClass: 'icon-orders',
      description: 'New orders'
    },
    {
      title: 'Revenue',
      value: 'LKR 450K',
      icon: 'trending_up',
      iconClass: 'icon-revenue',
      description: 'This month'
    }
  ];

  recentActivities = [
    {
      id: 1,
      description: 'New order #1023 created by John Customer',
      time: '2 minutes ago',
      icon: 'shopping_cart'
    },
    {
      id: 2,
      description: 'Payment received for invoice #INV-001',
      time: '15 minutes ago',
      icon: 'payment'
    },
    {
      id: 3,
      description: 'New customer Alice Johnson registered',
      time: '1 hour ago',
      icon: 'person_add'
    },
    {
      id: 4,
      description: 'Product "Makita Drill" stock updated',
      time: '2 hours ago',
      icon: 'inventory'
    }
  ];

  ngOnInit(): void {
    this.updateBreakpoint();
    window.addEventListener('resize', () => this.updateBreakpoint());
  }

  private updateBreakpoint(): void {
    const width = window.innerWidth;
    if (width <= 768) {
      this.breakpoint = 1;
    } else if (width <= 1024) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 4;
    }
  }
}
