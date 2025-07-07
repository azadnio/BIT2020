import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../../core/services/auth.service';
import { CustomerService } from '../../../core/services/customer.service';
import { MessageService } from '../../../core/services/message.service';
import { User, Customer } from '../../../core/models/user.model';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class CustomerProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);

  currentUser: User | null = null;
  customerData: Customer | null = null;
  profileForm: FormGroup;
  addressForm: FormGroup;
  isUpdating = false;

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nic: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      telephone: [''],
    });

    this.addressForm = this.fb.group({
      address: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.loadCustomerData();
      this.initializeForms();
    }
  }

  private loadCustomerData(): void {
    if (this.currentUser) {
      this.customerService.getCustomerByUserId(this.currentUser.id).subscribe({
        next: (customer) => {
          this.customerData = customer;
        },
        error: (error) => {
          console.error('Error loading customer data:', error);
        },
      });
    }
  }

  private initializeForms(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
        nic: this.currentUser.nic,
        mobile: this.currentUser.mobile,
        telephone: this.currentUser.telephone,
      });

      this.addressForm.patchValue({
        address: this.currentUser.address,
        address2: this.currentUser.address2,
        city: this.currentUser.city,
      });
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid && this.currentUser) {
      this.isUpdating = true;

      // In a real application, you would call a user update service
      // For now, we'll just show a success message
      setTimeout(() => {
        this.messageService.showSuccess('Profile updated successfully!');
        this.isUpdating = false;
      }, 1000);
    }
  }

  updateAddress(): void {
    if (this.addressForm.valid && this.currentUser) {
      this.isUpdating = true;

      // In a real application, you would call a user update service
      // For now, we'll just show a success message
      setTimeout(() => {
        this.messageService.showSuccess('Address updated successfully!');
        this.isUpdating = false;
      }, 1000);
    }
  }

  resetForm(): void {
    this.initializeForms();
  }

  resetAddressForm(): void {
    this.initializeForms();
  }
}
