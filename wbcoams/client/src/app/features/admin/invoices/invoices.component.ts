import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CustomerSelectionDialogComponent, Customer, CustomerSelectionDialogData } from '../../../shared/components/customer-selection-dialog/customer-selection-dialog.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  selectedCustomer: Customer | null = null;

  openCustomerSelectionDialog(): void {
    const dialogData: CustomerSelectionDialogData = {
      title: 'Select Customer for Invoice',
      allowMultiSelect: false,
      selectedCustomers: this.selectedCustomer ? [this.selectedCustomer] : []
    };

    const dialogRef = this.dialog.open(CustomerSelectionDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      height: '600px',
      maxHeight: '90vh',
      data: dialogData,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((selectedCustomers: Customer[] | null) => {
      if (selectedCustomers && selectedCustomers.length > 0) {
        const customer = selectedCustomers[0];
        this.selectedCustomer = customer;
        
        this.snackBar.open(`Customer selected: ${customer.name}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }

  // Example method to demonstrate multi-select usage
  openMultiCustomerSelectionDialog(): void {
    const dialogData: CustomerSelectionDialogData = {
      title: 'Select Multiple Customers for Bulk Invoice',
      allowMultiSelect: true,
      selectedCustomers: []
    };

    const dialogRef = this.dialog.open(CustomerSelectionDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      height: '600px',
      maxHeight: '90vh',
      data: dialogData,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((selectedCustomers: Customer[] | null) => {
      if (selectedCustomers && selectedCustomers.length > 0) {
        this.snackBar.open(`${selectedCustomers.length} customer(s) selected for bulk invoice`, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }
}
