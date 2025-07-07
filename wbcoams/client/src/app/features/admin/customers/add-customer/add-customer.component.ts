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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService } from '../../../../core/services/customer.service';
import { MessageService } from '../../../../core/services/message.service';
import { Customer } from '../../../../core/models/user.model';

@Component({
  selector: 'app-add-customer',
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
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  customerForm!: FormGroup;
  isLoading = false;
  isSubmitting = false;

  // Cities list for the dropdown (you can extend this or fetch from a service)
  cities = [
    'Colombo', 'Kandy', 'Galle', 'Jaffna', 'Negombo', 'Anuradhapura', 
    'Polonnaruwa', 'Batticaloa', 'Trincomalee', 'Kurunegala', 'Ratnapura',
    'Badulla', 'Matara', 'Kalutara', 'Gampaha', 'Kegalle', 'Hambantota',
    'Vavuniya', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Ampara', 'Moneragala'
  ];

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.customerForm = this.fb.group({
      // User fields
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      telephone: [''],
      nic: ['', [Validators.required, Validators.pattern(/^([0-9]{9}[vVxX]|[0-9]{12})$/)]],
      address: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      
      // Customer specific fields
      creditLimit: [100000, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const customerData = this.customerForm.value;
      
      this.customerService.createCustomer(customerData).subscribe({
        next: (customer: Customer) => {
          this.messageService.showSuccess('Customer created successfully!');
          this.router.navigate(['/admin/customers']);
        },
        error: (error) => {
          console.error('Error creating customer:', error);
          this.messageService.showError('Failed to create customer. Please try again.');
          this.isSubmitting = false;
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/customers']);
  }

  onReset(): void {
    this.customerForm.reset();
    this.initializeForm();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.customerForm.controls).forEach(key => {
      const control = this.customerForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.customerForm.get(fieldName);
    if (control?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('pattern')) {
      if (fieldName === 'mobile') {
        return 'Mobile number must be 10 digits';
      }
      if (fieldName === 'nic') {
        return 'Please enter a valid NIC number';
      }
    }
    if (control?.hasError('minlength')) {
      return `${this.getFieldLabel(fieldName)} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control?.hasError('min')) {
      return `${this.getFieldLabel(fieldName)} must be greater than or equal to ${control.errors?.['min'].min}`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      mobile: 'Mobile',
      telephone: 'Telephone',
      nic: 'NIC',
      address: 'Address',
      address2: 'Address Line 2',
      city: 'City',
      creditLimit: 'Credit Limit'
    };
    return labels[fieldName] || fieldName;
  }
}
