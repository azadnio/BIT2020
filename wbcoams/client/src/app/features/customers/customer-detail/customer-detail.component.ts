import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Customer } from '../../../core/models/user.model';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="detail-container">
      <div class="header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Customer Details</h1>
        <button mat-raised-button color="primary" (click)="editCustomer()">
          <mat-icon>edit</mat-icon>
          Edit
        </button>
      </div>

      @if (customer) {
        <mat-card class="info-card">
          <mat-card-header>
            <mat-card-title>{{ customer.user?.name }}</mat-card-title>
            <mat-card-subtitle>{{ customer.user?.email }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item">
                <label>Mobile:</label>
                <span>{{ customer.user?.mobile }}</span>
              </div>
              <div class="info-item">
                <label>City:</label>
                <span>{{ customer.user?.city }}</span>
              </div>
              <div class="info-item">
                <label>Credit Limit:</label>
                <span>LKR {{ customer.creditLimit | number:'1.2-2' }}</span>
              </div>
              <div class="info-item">
                <label>Credit Balance:</label>
                <span>LKR {{ customer.creditBalance | number:'1.2-2' }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .detail-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .header h1 {
      flex: 1;
      margin: 0;
    }

    .info-card {
      margin-bottom: 24px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item label {
      font-weight: 500;
      color: #666;
      font-size: 14px;
    }

    .info-item span {
      font-size: 16px;
      color: #333;
    }
  `]
})
export class CustomerDetailComponent implements OnInit {
  customer?: Customer;
  customerId?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerId = parseInt(id);
      this.loadCustomer();
    }
  }

  loadCustomer(): void {
    // Mock data - replace with actual service call
    this.customer = {
      id: this.customerId!,
      userId: 1,
      creditLimit: 50000,
      creditBalance: 5000,
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0771234567',
        city: 'Colombo',
        address: '123 Main St',
        nic: '123456789V',
        role: 'customer',
        isActive: true,
        createdAt: new Date().toISOString(),
        createdUserId: 1,
        updatedAt: new Date().toISOString(),
        updatedUserId: 1
      }
    };
  }

  editCustomer(): void {
    this.router.navigate(['/dashboard/customers/edit', this.customerId]);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/customers']);
  }
}
