import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Customer } from '../../../core/models/user.model';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    MatPaginatorModule,
    FormsModule
  ],
  template: `
    <div class="customers-container">
      <div class="header">
        <h1>Customers</h1>
        <button mat-raised-button color="primary" (click)="createCustomer()">
          <mat-icon>add</mat-icon>
          Add Customer
        </button>
      </div>

      <mat-card class="search-card">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search customers</mat-label>
          <input matInput [(ngModel)]="searchTerm" (input)="applyFilter()" placeholder="Name, email, or phone">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </mat-card>

      <mat-card class="table-card">
        <div class="table-container">
          <table mat-table [dataSource]="filteredCustomers" class="customers-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let customer">
                <div class="customer-info">
                  <div class="customer-name">{{ customer.user?.name }}</div>
                  <div class="customer-email">{{ customer.user?.email }}</div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="contact">
              <th mat-header-cell *matHeaderCellDef>Contact</th>
              <td mat-cell *matCellDef="let customer">
                <div class="contact-info">
                  <div>{{ customer.user?.mobile }}</div>
                  <div class="secondary-text">{{ customer.user?.city }}</div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="creditInfo">
              <th mat-header-cell *matHeaderCellDef>Credit Info</th>
              <td mat-cell *matCellDef="let customer">
                <div class="credit-info">
                  <div>Limit: LKR {{ customer.creditLimit | number:'1.2-2' }}</div>
                  <div class="balance" [class.negative]="customer.creditBalance > 0">
                    Balance: LKR {{ customer.creditBalance | number:'1.2-2' }}
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let customer">
                <mat-chip [class]="customer.user?.isActive ? 'status-active' : 'status-inactive'">
                  {{ customer.user?.isActive ? 'Active' : 'Inactive' }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let customer">
                <button mat-icon-button (click)="viewCustomer(customer.id)">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button (click)="editCustomer(customer.id)">
                  <mat-icon>edit</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                class="table-row" (click)="viewCustomer(row.id)"></tr>
          </table>
        </div>

        <mat-paginator [pageSizeOptions]="[10, 25, 50]" 
                       [pageSize]="10" 
                       showFirstLastButtons>
        </mat-paginator>
      </mat-card>
    </div>
  `,
  styles: [`
    .customers-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header h1 {
      margin: 0;
      color: #333;
    }

    .search-card {
      margin-bottom: 24px;
      padding: 16px;
    }

    .search-field {
      width: 100%;
      max-width: 400px;
    }

    .table-card {
      padding: 0;
    }

    .table-container {
      overflow-x: auto;
    }

    .customers-table {
      width: 100%;
    }

    .customer-info {
      display: flex;
      flex-direction: column;
    }

    .customer-name {
      font-weight: 500;
      margin-bottom: 4px;
    }

    .customer-email {
      font-size: 12px;
      color: #666;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
    }

    .secondary-text {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }

    .credit-info {
      display: flex;
      flex-direction: column;
    }

    .balance.negative {
      color: #f44336;
    }

    .status-active {
      background-color: #4CAF50;
      color: white;
    }

    .status-inactive {
      background-color: #757575;
      color: white;
    }

    .table-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .table-row:hover {
      background-color: #f5f5f5;
    }

    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }
    }
  `]
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'contact', 'creditInfo', 'status', 'actions'];
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    // Mock data - replace with actual service call
    this.customers = [
      {
        id: 1,
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
      }
    ];
    this.filteredCustomers = [...this.customers];
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredCustomers = [...this.customers];
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer =>
      customer.user?.name?.toLowerCase().includes(searchLower) ||
      customer.user?.email?.toLowerCase().includes(searchLower) ||
      customer.user?.mobile?.includes(this.searchTerm)
    );
  }

  createCustomer(): void {
    this.router.navigate(['/dashboard/customers/create']);
  }

  viewCustomer(id: number): void {
    this.router.navigate(['/dashboard/customers', id]);
  }

  editCustomer(id: number): void {
    this.router.navigate(['/dashboard/customers/edit', id]);
  }
}
