import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OrderService } from '../../../../core/services/order.service';
import { ProductService } from '../../../../core/services/product.service';
import { MessageService } from '../../../../core/services/message.service';
import { OrderItem } from '../../../../core/models/order.model';
import { Product } from '../../../../core/models/product.model';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-item',
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
    MatAutocompleteModule,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent implements OnInit {
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  itemForm!: FormGroup;
  isLoading = false;
  isSubmitting = false;
  orderId!: number;
  
  products: Product[] = [];
  filteredProducts!: Observable<Product[]>;

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
    this.getOrderId();
    this.setupProductFilter();
  }

  private initializeForm(): void {
    this.itemForm = this.fb.group({
      productId: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      remarks: ['']
    });
  }

  private getOrderId(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      if (!this.orderId) {
        this.messageService.showError('Invalid order ID');
        this.router.navigate(['/admin/orders']);
      }
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts({ isActive: true }).subscribe({
      next: (response) => {
        this.products = response.products || response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.messageService.showError('Failed to load products');
        this.isLoading = false;
      }
    });
  }

  private setupProductFilter(): void {
    this.filteredProducts = this.itemForm.get('productId')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.description || '';
        return name ? this._filterProducts(name) : this.products.slice();
      })
    );
  }

  private _filterProducts(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.products.filter(product => 
      product.description.toLowerCase().includes(filterValue) ||
      product.info.toLowerCase().includes(filterValue) ||
      product.brand?.name.toLowerCase().includes(filterValue) ||
      product.category?.name.toLowerCase().includes(filterValue)
    );
  }

  displayProduct(product: Product): string {
    return product ? `${product.description} - ${product.brand?.name || 'Unknown Brand'}` : '';
  }

  onProductSelected(product: Product): void {
    if (product && product.price) {
      this.itemForm.patchValue({
        price: product.price
      });
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = this.itemForm.value;
      const newItem: Partial<OrderItem> = {
        orderId: this.orderId,
        itemId: formData.productId.id || formData.productId,
        quantity: formData.quantity,
        price: formData.price
      };

      this.orderService.addOrderItem(this.orderId, newItem).subscribe({
        next: (item) => {
          this.messageService.showSuccess('Item added to order successfully');
          this.router.navigate(['/admin/orders', this.orderId]);
        },
        error: (error) => {
          console.error('Error adding item:', error);
          this.messageService.showError('Failed to add item to order');
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/orders', this.orderId]);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.itemForm.controls).forEach(key => {
      const control = this.itemForm.get(key);
      control?.markAsTouched();
    });
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.itemForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.itemForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['min']) return `${fieldName} must be greater than ${field.errors['min'].min}`;
      if (field.errors['email']) return 'Invalid email format';
    }
    return '';
  }
}
