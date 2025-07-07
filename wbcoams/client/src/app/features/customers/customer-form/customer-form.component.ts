import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  template: `
    <div class="form-container">
      <mat-card class="form-card">
        <mat-card-header>
          <mat-card-title>
            {{ isEditing ? 'Edit Customer' : 'Add New Customer' }}
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="name" required>
                @if (customerForm.get('name')?.invalid && customerForm.get('name')?.touched) {
                  <mat-error>Name is required</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" required>
                @if (customerForm.get('email')?.invalid && customerForm.get('email')?.touched) {
                  <mat-error>Please enter a valid email</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Mobile</mat-label>
                <input matInput formControlName="mobile" required>
                @if (customerForm.get('mobile')?.invalid && customerForm.get('mobile')?.touched) {
                  <mat-error>Mobile number is required</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Telephone</mat-label>
                <input matInput formControlName="telephone">
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>NIC</mat-label>
                <input matInput formControlName="nic" required>
                @if (customerForm.get('nic')?.invalid && customerForm.get('nic')?.touched) {
                  <mat-error>NIC is required</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Address</mat-label>
                <input matInput formControlName="address" required>
                @if (customerForm.get('address')?.invalid && customerForm.get('address')?.touched) {
                  <mat-error>Address is required</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Address 2 (Optional)</mat-label>
                <input matInput formControlName="address2">
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>City</mat-label>
                <input matInput formControlName="city" required>
                @if (customerForm.get('city')?.invalid && customerForm.get('city')?.touched) {
                  <mat-error>City is required</mat-error>
                }
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Credit Limit</mat-label>
                <input matInput type="number" formControlName="creditLimit" required>
                <span matTextPrefix>LKR </span>
                @if (customerForm.get('creditLimit')?.invalid && customerForm.get('creditLimit')?.touched) {
                  <mat-error>Credit limit is required</mat-error>
                }
              </mat-form-field>

              <div class="toggle-field">
                <mat-slide-toggle formControlName="isActive">
                  Active Customer
                </mat-slide-toggle>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" mat-button (click)="goBack()">Cancel</button>
              <button type="submit" mat-raised-button color="primary" 
                      [disabled]="customerForm.invalid || isLoading">
                @if (isLoading) {
                  {{ isEditing ? 'Updating...' : 'Creating...' }}
                } @else {
                  {{ isEditing ? 'Update Customer' : 'Create Customer' }}
                }
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .form-card {
      margin-bottom: 24px;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .full-width {
      flex: 1;
    }

    .half-width {
      flex: 1;
    }

    .toggle-field {
      display: flex;
      align-items: center;
      flex: 1;
      padding-top: 8px;
    }

    .form-actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #e0e0e0;
    }

    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditing = false;
  isLoading = false;
  customerId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      telephone: [''],
      nic: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      creditLimit: [0, [Validators.required, Validators.min(0)]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.customerId = parseInt(id);
      this.loadCustomer();
    }
  }

  loadCustomer(): void {
    // Mock data - replace with actual service call
    if (this.customerId) {
      // Load customer data here
      this.customerForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0771234567',
        nic: '123456789V',
        address: '123 Main St',
        city: 'Colombo',
        creditLimit: 50000,
        isActive: true
      });
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard/customers']);
      }, 1000);
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/customers']);
  }
}
