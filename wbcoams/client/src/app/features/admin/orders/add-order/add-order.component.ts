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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OrderService } from '../../../../core/services/order.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { MessageService } from '../../../../core/services/message.service';
import { Order } from '../../../../core/models/order.model';
import { Customer } from '../../../../core/models/user.model';

@Component({
  selector: 'app-add-order',
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.scss',
})
export class AddOrderComponent implements OnInit {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  orderForm!: FormGroup;
  isLoading = false;
  isSubmitting = false;
  customers: Customer[] = [];

  orderStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'on_hold', label: 'On Hold' }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.loadCustomers();
  }

  private initializeForm(): void {
    this.orderForm = this.fb.group({
      customerId: ['', [Validators.required]],
      orderDate: [new Date(), [Validators.required]],
      status: ['pending', [Validators.required]],
      remarks: ['']
    });
  }

  private loadCustomers(): void {
    this.isLoading = true;
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.messageService.showError('Failed to load customers');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = this.orderForm.value;
      const newOrder: Partial<Order> = {
        customerId: formData.customerId,
        orderDate: formData.orderDate.toISOString(),
        status: formData.status,
        remarks: formData.remarks,
        total: 0, // Will be calculated when items are added
        isActive: true
      };

      this.orderService.createOrder(newOrder).subscribe({
        next: (order) => {
          this.messageService.showSuccess('Order created successfully');
          this.router.navigate(['/admin/orders', order.id]);
        },
        error: (error) => {
          console.error('Error creating order:', error);
          this.messageService.showError('Failed to create order');
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/orders']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.orderForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.orderForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
    }
    return '';
  }
}
