import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerSelectionDialogComponent, Customer, CustomerSelectionDialogData } from '../../../shared/components/customer-selection-dialog/customer-selection-dialog.component';
import { ReportsService } from '../../../core/services/reports.service';
import {
  CustomerSalesReport,
  CustomerPaymentsReport,
  CustomerSpecificSalesReport,
  ReturnChequesReport,
  SalesPaymentComparisonReport,
  ReportQueryParams,
} from '../../../core/models/report.model';

// Legacy interfaces for backward compatibility
export interface CustomerSalesData {
  customerId: string;
  name: string;
  city: string;
  purchases: number;
}

export interface CustomerPaymentsData {
  customerId: string;
  name: string;
  city: string;
  amount: number;
}

export interface CustomerSpecificSalesData {
  invoiceNo: string;
  date: string;
  amount: number;
}

export interface ReturnChequesData {
  cusId: string;
  customerName: string;
  city: string;
  chequeNo: string;
  amount: number;
}

export interface SalesPaymentComparisonData {
  cusId: string;
  customerName: string;
  city: string;
  sales: number;
  payments: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private reportsService = inject(ReportsService);

  // Report parameters
  startDate: Date = new Date(2025, 3, 1); // April 1, 2025
  endDate: Date = new Date(2025, 3, 30); // April 30, 2025
  reportType: string = 'customer-sales';
  selectedCustomer: string = 'CU4'; // For customer-specific sales report
  selectedCustomerName: string = 'Metro Hardware, Kandy'; // Display name
  isLoading = false;

  // Table columns
  customerSalesColumns = ['customerId', 'name', 'purchases'];
  customerPaymentsColumns = ['customerId', 'name', 'amount'];
  customerSpecificSalesColumns = ['invoiceNo', 'date', 'amount'];
  returnChequesColumns = ['cusId', 'customerName', 'chequeNo', 'amount'];
  salesPaymentComparisonColumns = ['cusId', 'customerName', 'sales', 'payments'];

  // Data arrays - will be populated from API
  customerSalesData: CustomerSalesData[] = [];
  customerPaymentsData: CustomerPaymentsData[] = [];
  customerSpecificSalesData: CustomerSpecificSalesData[] = [];
  returnChequesData: ReturnChequesData[] = [];
  salesPaymentComparisonData: SalesPaymentComparisonData[] = [];

  ngOnInit(): void {
    // Load initial report data
    this.loadReportMetadata();
    this.generateReport(); // Generate default report on load
  }

  private loadReportMetadata(): void {
    this.reportsService.getReportMetadata().subscribe({
      next: (metadata) => {
        console.log('Report metadata loaded:', metadata);
        // Could use this to set default date ranges or show available report types
      },
      error: (error) => {
        console.warn('Failed to load report metadata:', error);
        // Non-critical error, continue with default values
      }
    });
  }

  openCustomerSelectionDialog(): void {
    const dialogData: CustomerSelectionDialogData = {
      title: 'Select Customer for Report',
      allowMultiSelect: false,
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
        const customer = selectedCustomers[0];
        this.selectedCustomer = customer.id;
        this.selectedCustomerName = customer.name;
        
        this.snackBar.open(`Customer selected: ${customer.name}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        // Automatically regenerate report if customer-specific report is selected
        if (this.reportType === 'customer-specific-sales') {
          this.generateReport();
        }
      }
    });
  }

  generateReport(): void {
    this.isLoading = true;
    
    const reportParams: ReportQueryParams = {
      from: this.formatDateForAPI(this.startDate),
      to: this.formatDateForAPI(this.endDate)
    };

    // Clear previous data
    this.clearReportData();

    switch (this.reportType) {
      case 'customer-sales':
        this.reportsService.getCustomerSalesReport(reportParams).subscribe({
          next: (data) => {
            this.customerSalesData = data;
            this.isLoading = false;
            this.showSuccessMessage('Customer sales report generated successfully!');
          },
          error: (error) => {
            this.handleError('Failed to generate customer sales report', error);
          }
        });
        break;

      case 'customer-payments':
        this.reportsService.getCustomerPaymentsReport(reportParams).subscribe({
          next: (data) => {
            this.customerPaymentsData = data;
            this.isLoading = false;
            this.showSuccessMessage('Customer payments report generated successfully!');
          },
          error: (error) => {
            this.handleError('Failed to generate customer payments report', error);
          }
        });
        break;

      case 'customer-specific-sales':
        if (!this.selectedCustomer) {
          this.isLoading = false;
          this.snackBar.open('Please select a customer first', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          return;
        }
        
        this.reportsService.getCustomerSpecificSalesReport(this.selectedCustomer, reportParams).subscribe({
          next: (data) => {
            this.customerSpecificSalesData = data;
            this.isLoading = false;
            this.showSuccessMessage('Customer specific sales report generated successfully!');
          },
          error: (error) => {
            this.handleError('Failed to generate customer specific sales report', error);
          }
        });
        break;

      case 'return-cheques':
        this.reportsService.getReturnChequesReport(reportParams).subscribe({
          next: (data) => {
            this.returnChequesData = data;
            this.isLoading = false;
            this.showSuccessMessage('Return cheques report generated successfully!');
          },
          error: (error) => {
            this.handleError('Failed to generate return cheques report', error);
          }
        });
        break;

      case 'sales-payment-comparison':
        this.reportsService.getSalesPaymentComparisonReport(reportParams).subscribe({
          next: (data) => {
            this.salesPaymentComparisonData = data;
            this.isLoading = false;
            this.showSuccessMessage('Sales and payment comparison report generated successfully!');
          },
          error: (error) => {
            this.handleError('Failed to generate sales and payment comparison report', error);
          }
        });
        break;

      default:
        this.isLoading = false;
        this.snackBar.open('Invalid report type selected', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
    }
  }

  private clearReportData(): void {
    this.customerSalesData = [];
    this.customerPaymentsData = [];
    this.customerSpecificSalesData = [];
    this.returnChequesData = [];
    this.salesPaymentComparisonData = [];
  }

  private formatDateForAPI(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  private handleError(message: string, error: any): void {
    console.error('Report generation error:', error);
    this.isLoading = false;
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  exportToPDF(): void {
    // Simulate PDF export
    this.snackBar.open('Exporting to PDF...', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    
    // In a real application, you would use a library like jsPDF or pdfMake
    setTimeout(() => {
      const element = document.getElementById('report-content');
      if (element) {
        // Simulate PDF download
        console.log('PDF export would happen here');
        this.snackBar.open('PDF exported successfully!', 'Close', {
          duration: 3000,
        });
      }
    }, 2000);
  }

  exportToExcel(): void {
    // Simulate Excel export
    this.snackBar.open('Exporting to Excel...', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    
    // In a real application, you would use a library like xlsx
    setTimeout(() => {
      console.log('Excel export would happen here');
      this.snackBar.open('Excel exported successfully!', 'Close', {
        duration: 3000,
      });
    }, 2000);
  }

  printReport(): void {
    const printContent = document.getElementById('report-content');
    if (printContent) {
      const winPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      if (winPrint) {
        winPrint.document.write(`
          <html>
            <head>
              <title>Capital Hardware Report</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .letterhead { text-align: center; margin-bottom: 30px; }
                .letterhead img { max-width: 100%; height: auto; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; }
                .report-header { margin-bottom: 20px; }
                .total-row { font-weight: bold; background-color: #f9f9f9; }
                @media print {
                  body { margin: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        winPrint.document.close();
        winPrint.focus();
        winPrint.print();
        winPrint.close();
      }
    }
  }

  onLetterheadImageError(event: any): void {
    // Fallback to the alternative letterhead image if the first one fails
    const fallbackImages = [
      'assets/images/CAPITALHARDWARletterhead2.png',
      'https://via.placeholder.com/800x150/2c3e50/ffffff?text=CAPITAL+HARDWARE'
    ];
    
    const currentSrc = event.target.src;
    
    if (currentSrc.includes('capital-hardware-letterhead.png')) {
      event.target.src = fallbackImages[0];
    } else if (currentSrc.includes('CAPITALHARDWARletterhead2.png')) {
      event.target.src = fallbackImages[1];
    } else {
      // If all fail, hide the image
      event.target.style.display = 'none';
    }
  }

  getCustomerSalesTotal(): number {
    return this.customerSalesData.reduce((total, customer) => total + customer.purchases, 0);
  }

  getCustomerPaymentsTotal(): number {
    return this.customerPaymentsData.reduce((total, payment) => total + payment.amount, 0);
  }

  getCustomerSpecificSalesTotal(): number {
    return this.customerSpecificSalesData.reduce((total, sale) => total + sale.amount, 0);
  }

  getReturnChequesTotal(): number {
    return this.returnChequesData.reduce((total, cheque) => total + cheque.amount, 0);
  }

  getSalesPaymentComparisonTotals(): { sales: number; payments: number } {
    const sales = this.salesPaymentComparisonData.reduce((total, item) => total + item.sales, 0);
    const payments = this.salesPaymentComparisonData.reduce((total, item) => total + item.payments, 0);
    return { sales, payments };
  }

  getSelectedCustomerName(): string {
    return this.selectedCustomerName || 'Metro Hardware, Kandy';
  }
}
