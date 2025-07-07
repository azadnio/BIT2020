import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CustomerService } from '../../../core/services/customer.service';
import { MessageService } from '../../../core/services/message.service';
import { Customer } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-customers',
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
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class AdminCustomersComponent implements OnInit {
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);
  private dialog = inject(MatDialog);

  customers: Customer[] = [];
  cities: string[] = [];
  displayedColumns = [
    'id',
    'name',
    'city',
    'mobile',
    'creditLimit',
    'creditBalance',
    'status',
    'actions',
  ];

  searchQuery = '';
  statusFilter = '';
  cityFilter = '';
  currentPage = 0;
  pageSize = 10;
  totalCustomers = 0;
  isLoading = false;

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.totalCustomers = customers.length;
        this.extractCities(customers);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.isLoading = false;
      },
    });
  }

  private extractCities(customers: Customer[]): void {
    const citySet = new Set<string>();
    customers.forEach((customer) => {
      if (customer.city) {
        citySet.add(customer.city);
      }
    });
    this.cities = Array.from(citySet).sort();
  }

  onFiltersChange(): void {
    this.currentPage = 0;
    this.applyFilters();
  }

  private applyFilters(): void {
    // In a real application, this would be handled by the backend
    // For now, we'll just reload the data
    this.loadCustomers();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCustomers();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.statusFilter = '';
    this.cityFilter = '';
    this.currentPage = 0;
    this.loadCustomers();
  }

  editCustomer(customer: Customer): void {
    // Open edit dialog or navigate to edit page
    console.log('Edit customer:', customer);
  }

  deleteCustomer(customer: Customer): void {
    if (
      confirm(
        `Are you sure you want to delete customer "${customer.user?.name}"?`,
      )
    ) {
      this.customerService.deleteCustomer(customer.id).subscribe({
        next: () => {
          this.messageService.showSuccess('Customer deleted successfully');
          this.loadCustomers();
        },
        error: (error) => {
          console.error('Error deleting customer:', error);
        },
      });
    }
  }
}
