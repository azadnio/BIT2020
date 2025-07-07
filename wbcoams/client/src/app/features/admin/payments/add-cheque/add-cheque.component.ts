import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentService } from '../../../../core/services/payment.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { MessageService } from '../../../../core/services/message.service';
import { Cheque } from '../../../../core/models/payment.model';
import { Customer } from '../../../../core/models/user.model';

@Component({
  selector: 'app-add-cheque',
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
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-cheque.component.html',
  styleUrl: './add-cheque.component.scss',
})
export class AddChequeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  chequeForm!: FormGroup;
  customers: Customer[] = [];
  isLoading = false;
  isSubmitting = false;
  isLoadingCustomers = false;

  // Common Sri Lankan banks
  banks = [
    'Bank of Ceylon (BOC)',
    'People\'s Bank',
    'Commercial Bank of Ceylon',
    'Hatton National Bank (HNB)',
    'Sampath Bank',
    'Nations Trust Bank (NTB)',
    'DFCC Bank',
    'Union Bank',
    'Seylan Bank',
    'Pan Asia Banking Corporation',
    'National Development Bank (NDB)',
    'HSBC Sri Lanka',
    'Standard Chartered Bank',
    'Citibank',
    'Deutsche Bank'
  ];

  // Cheque statuses
  chequeStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'passed', label: 'Passed' },
    { value: 'returned', label: 'Returned' }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.loadCustomers();
  }

  private initializeForm(): void {
    this.chequeForm = this.fb.group({
      // Cheque details
      chequeNumber: ['', [Validators.required, Validators.minLength(3)]],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      chequeDate: [new Date(), [Validators.required]],
      status: ['pending', [Validators.required]],
      
      // Customer information
      customerId: ['', [Validators.required]],
      
      // Bank details
      bankName: ['', [Validators.required]],
      bankBranch: ['', [Validators.required]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8,20}$/)]],
      
      // Additional information
      remarks: ['']
    });
  }

  private loadCustomers(): void {
    this.isLoadingCustomers = true;
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.isLoadingCustomers = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.messageService.showError('Failed to load customers');
        this.isLoadingCustomers = false;
      }
    });
  }

  onSubmit(): void {
    if (this.chequeForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const chequeData = {
        ...this.chequeForm.value,
        chequeDate: this.chequeForm.value.chequeDate.toISOString()
      };
      
      this.paymentService.createCheque(chequeData).subscribe({
        next: (cheque: Cheque) => {
          this.messageService.showSuccess('Cheque created successfully!');
          this.router.navigate(['/admin/payments']);
        },
        error: (error) => {
          console.error('Error creating cheque:', error);
          this.messageService.showError('Failed to create cheque. Please try again.');
          this.isSubmitting = false;
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/payments']);
  }

  onReset(): void {
    this.chequeForm.reset();
    this.initializeForm();
  }

  generateChequeNumber(): void {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const chequeNumber = `CHQ${timestamp}${randomSuffix}`;
    this.chequeForm.patchValue({ chequeNumber });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.chequeForm.controls).forEach(key => {
      const control = this.chequeForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.chequeForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (control?.hasError('pattern')) {
      if (fieldName === 'accountNumber') {
        return 'Account number must be 8-20 digits';
      }
    }
    if (control?.hasError('minlength')) {
      return `${this.getFieldLabel(fieldName)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('min')) {
      return `${this.getFieldLabel(fieldName)} must be greater than ${control.errors?.['min'].min}`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      chequeNumber: 'Cheque Number',
      amount: 'Amount',
      chequeDate: 'Cheque Date',
      status: 'Status',
      customerId: 'Customer',
      bankName: 'Bank Name',
      bankBranch: 'Bank Branch',
      accountNumber: 'Account Number',
      remarks: 'Remarks'
    };
    return labels[fieldName] || fieldName;
  }

  getCustomerDisplayName(customer: Customer): string {
    return `${customer.user?.name || customer.name} - ${customer.user?.email || customer.email}`;
  }
}
