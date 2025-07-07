import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { PaymentService } from '../../../core/services/payment.service';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from '../../../core/services/message.service';
import { Payment, Cheque } from '../../../core/models/payment.model';
import { CustomerSelectionDialogComponent, Customer, CustomerSelectionDialogData } from '../../../shared/components/customer-selection-dialog/customer-selection-dialog.component';

@Component({
  selector: 'app-customer-payments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class CustomerPaymentsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  paymentForm: FormGroup;
  cheques: Cheque[] = [];
  paymentHistory: Payment[] = [];
  chequeColumns = ['number', 'date', 'amount', 'bank', 'accNo', 'command'];

  selectedCustomer: Customer | null = null;
  showChequesSection = false;
  isSubmitting = false;
  isLoadingPayments = false;

  constructor() {
    this.paymentForm = this.fb.group({
      customerId: [{ value: '', disabled: true }, [Validators.required]],
      cash: [0, [Validators.required, Validators.min(0)]],
      paymentDate: [new Date(), [Validators.required]],
      type: ['cash', [Validators.required]],
      remarks: [''],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPaymentHistory();
  }

  private initializeForm(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.paymentForm.patchValue({
        customerId: currentUser.id,
      });
    }
  }

  onPaymentTypeChange(type: string): void {
    this.showChequesSection = type.includes('cheque');
    if (!this.showChequesSection) {
      this.cheques = [];
    }
  }

  openCustomerSelectionDialog(): void {
    const dialogData: CustomerSelectionDialogData = {
      title: 'Select Customer for Payment',
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
        
        // Update the form with selected customer
        this.paymentForm.patchValue({
          customerId: customer.id
        });
        
        this.snackBar.open(`Customer selected: ${customer.name}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }

  addCheque(): void {
    // Open cheque dialog (simplified for now)
    const newCheque: Cheque = {
      id: 0,
      chequeNumber: `CHQ${Date.now()}`,
      status: 'pending',
      amount: 100.0,
      customerId: this.paymentForm.value.customerId,
      bankName: 'Sample Bank',
      bankBranch: 'Main Branch',
      accountNumber: '1234567890',
      chequeDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.cheques.push(newCheque);
  }

  removeCheque(index: number): void {
    this.cheques.splice(index, 1);
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.isSubmitting = true;

      const paymentData = {
        ...this.paymentForm.value,
        custId: this.paymentForm.value.customerId,
        cheques: this.cheques,
      };

      this.paymentService.createPayment(paymentData).subscribe({
        next: (payment) => {
          this.messageService.showSuccess('Payment created successfully!');
          this.resetForm();
          this.loadPaymentHistory();
        },
        error: (error) => {
          console.error('Error creating payment:', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    }
  }

  resetForm(): void {
    this.paymentForm.reset();
    this.initializeForm();
    this.cheques = [];
    this.showChequesSection = false;
  }

  private loadPaymentHistory(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.isLoadingPayments = true;
      this.paymentService.getCustomerPayments(currentUser.id).subscribe({
        next: (payments) => {
          this.paymentHistory = payments;
          this.isLoadingPayments = false;
        },
        error: (error) => {
          console.error('Error loading payment history:', error);
          this.isLoadingPayments = false;
        },
      });
    }
  }
}
