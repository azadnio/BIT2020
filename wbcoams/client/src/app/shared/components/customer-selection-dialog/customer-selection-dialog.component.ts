import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface Customer {
  id: string;
  name: string;
  city: string;
  phoneNumber: string;
  email?: string;
  address?: string;
}

export interface CustomerSelectionDialogData {
  title?: string;
  allowMultiSelect?: boolean;
  selectedCustomers?: Customer[];
  customers?: Customer[];
}

@Component({
  selector: 'app-customer-selection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './customer-selection-dialog.component.html',
  styleUrl: './customer-selection-dialog.component.scss',
})
export class CustomerSelectionDialogComponent implements OnInit {
  searchQuery = '';
  isLoading = false;
  
  // Pagination
  currentPage = 0;
  pageSize = 10;
  totalCustomers = 0;
  
  // Table data
  displayedColumns = ['select', 'id', 'name', 'city', 'phoneNumber', 'actions'];
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  selectedCustomers: Customer[] = [];
  
  // Hardcoded customer data for demonstration
  private hardcodedCustomers: Customer[] = [
    { id: 'CU001', name: 'Anuruddha Distributors', city: 'Kalutara', phoneNumber: '+94-77-123-4567', email: 'anuruddha@gmail.com', address: '123 Main St, Kalutara' },
    { id: 'CU002', name: 'Gajindu Distributors', city: 'Anuradhapura', phoneNumber: '+94-77-234-5678', email: 'gajindu@gmail.com', address: '456 Temple Rd, Anuradhapura' },
    { id: 'CU003', name: 'Upali Hardware', city: 'Peradeniya', phoneNumber: '+94-77-345-6789', email: 'upali@gmail.com', address: '789 University Ave, Peradeniya' },
    { id: 'CU004', name: 'Metro Hardware', city: 'Kandy', phoneNumber: '+94-77-456-7890', email: 'metro@gmail.com', address: '321 King St, Kandy' },
    { id: 'CU005', name: 'Matale Hardware', city: 'Matale', phoneNumber: '+94-77-567-8901', email: 'matale@gmail.com', address: '654 Hill Rd, Matale' },
    { id: 'CU006', name: 'Mr. Hussain', city: 'Galioya', phoneNumber: '+94-77-678-9012', email: 'hussain@gmail.com', address: '987 Market St, Galioya' },
    { id: 'CU007', name: 'United Hardware', city: 'Matale', phoneNumber: '+94-77-789-0123', email: 'united@gmail.com', address: '147 Trade Center, Matale' },
    { id: 'CU008', name: 'Mr. Ariyapala', city: 'Kurunegala', phoneNumber: '+94-77-890-1234', email: 'ariyapala@gmail.com', address: '258 Commercial St, Kurunegala' },
    { id: 'CU009', name: 'Golden Glass', city: 'Kurunegala', phoneNumber: '+94-77-901-2345', email: 'golden@gmail.com', address: '369 Glass Ave, Kurunegala' },
    { id: 'CU010', name: 'Kandy Hardware', city: 'Kandy', phoneNumber: '+94-77-012-3456', email: 'kandy@gmail.com', address: '741 Hardware Ln, Kandy' },
    { id: 'CU011', name: 'Colombo Tools', city: 'Colombo', phoneNumber: '+94-77-123-7890', email: 'colombo@gmail.com', address: '852 Tool St, Colombo' },
    { id: 'CU012', name: 'Negombo Supplies', city: 'Negombo', phoneNumber: '+94-77-234-8901', email: 'negombo@gmail.com', address: '963 Supply Rd, Negombo' },
    { id: 'CU013', name: 'Galle Hardware', city: 'Galle', phoneNumber: '+94-77-345-9012', email: 'galle@gmail.com', address: '159 Fort St, Galle' },
    { id: 'CU014', name: 'Jaffna Trading', city: 'Jaffna', phoneNumber: '+94-77-456-0123', email: 'jaffna@gmail.com', address: '357 Trade St, Jaffna' },
    { id: 'CU015', name: 'Ratnapura Tools', city: 'Ratnapura', phoneNumber: '+94-77-567-1234', email: 'ratnapura@gmail.com', address: '468 Gem Rd, Ratnapura' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CustomerSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerSelectionDialogData
  ) {
    this.selectedCustomers = data.selectedCustomers || [];
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    
    // Use provided customers or hardcoded data
    this.customers = this.data.customers || this.hardcodedCustomers;
    
    // Simulate loading delay
    setTimeout(() => {
      this.applyFilters();
      this.isLoading = false;
    }, 300);
  }

  applyFilters(): void {
    let filtered = [...this.customers];
    
    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.id.toLowerCase().includes(query) ||
        customer.name.toLowerCase().includes(query) ||
        customer.city.toLowerCase().includes(query) ||
        customer.phoneNumber.toLowerCase().includes(query)
      );
    }
    
    this.totalCustomers = filtered.length;
    
    // Apply pagination
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredCustomers = filtered.slice(startIndex, endIndex);
  }

  onSearchChange(): void {
    this.currentPage = 0;
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilters();
  }

  isSelected(customer: Customer): boolean {
    return this.selectedCustomers.some(selected => selected.id === customer.id);
  }

  toggleSelection(customer: Customer): void {
    const index = this.selectedCustomers.findIndex(selected => selected.id === customer.id);
    
    if (index >= 0) {
      // Remove from selection
      this.selectedCustomers.splice(index, 1);
    } else {
      // Add to selection
      if (this.data.allowMultiSelect) {
        this.selectedCustomers.push(customer);
      } else {
        // Single select - replace existing selection
        this.selectedCustomers = [customer];
      }
    }
  }

  selectCustomer(customer: Customer): void {
    if (!this.data.allowMultiSelect) {
      // For single select, close dialog immediately
      this.dialogRef.close([customer]);
    } else {
      this.toggleSelection(customer);
    }
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedCustomers);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  clearSelection(): void {
    this.selectedCustomers = [];
  }

  getSelectionText(): string {
    const count = this.selectedCustomers.length;
    if (count === 0) return 'No customers selected';
    if (count === 1) return '1 customer selected';
    return `${count} customers selected`;
  }
}
