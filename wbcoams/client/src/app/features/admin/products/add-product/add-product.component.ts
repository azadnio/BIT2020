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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { ProductService } from '../../../../core/services/product.service';
import { MessageService } from '../../../../core/services/message.service';
import { Product, Category, Brand } from '../../../../core/models/product.model';

@Component({
  selector: 'app-add-product',
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
    MatSlideToggleModule,
    MatChipsModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  productForm!: FormGroup;
  isLoading = false;
  isSubmitting = false;
  
  categories: Category[] = [];
  brands: Brand[] = [];
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  // Common units for products
  units = [
    'pcs', 'kg', 'g', 'l', 'ml', 'm', 'cm', 'mm', 'ft', 'inch',
    'box', 'pack', 'set', 'pair', 'dozen', 'bundle', 'roll'
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
    this.loadBrands();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(3)]],
      info: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      oldPrice: ['', [Validators.min(0.01)]],
      unit: ['pcs', [Validators.required]],
      isActive: [true]
    });
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.filter(cat => cat.isActive);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.messageService.showError('Failed to load categories');
      }
    });
  }

  private loadBrands(): void {
    this.productService.getBrands().subscribe({
      next: (brands) => {
        this.brands = brands.filter(brand => brand.isActive);
      },
      error: (error) => {
        console.error('Error loading brands:', error);
        this.messageService.showError('Failed to load brands');
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.messageService.showError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.messageService.showError('Image size should be less than 5MB');
        return;
      }

      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    // Clear the file input
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit(): void {
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = this.productForm.value;
      const newProduct: Partial<Product> = {
        description: formData.description,
        info: formData.info,
        categoryId: formData.categoryId,
        brandId: formData.brandId,
        price: formData.price,
        oldPrice: formData.oldPrice || null,
        unit: formData.unit,
        isActive: formData.isActive
      };

      this.productService.createProduct(newProduct).subscribe({
        next: (product) => {
          if (this.selectedFile) {
            // Upload image if selected
            this.uploadImage(product.id);
          } else {
            this.messageService.showSuccess('Product created successfully');
            this.router.navigate(['/admin/products']);
          }
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.messageService.showError('Failed to create product');
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private uploadImage(productId: number): void {
    if (this.selectedFile) {
      this.productService.uploadProductImage(productId, this.selectedFile).subscribe({
        next: () => {
          this.messageService.showSuccess('Product created successfully with image');
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.messageService.showSuccess('Product created successfully, but image upload failed');
          this.router.navigate(['/admin/products']);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
      if (field.errors['min']) return `${this.getFieldLabel(fieldName)} must be greater than ${field.errors['min'].min}`;
      if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      description: 'Product name',
      info: 'Description',
      categoryId: 'Category',
      brandId: 'Brand',
      price: 'Price',
      oldPrice: 'Old price',
      unit: 'Unit'
    };
    return labels[fieldName] || fieldName;
  }

  // Price comparison validation
  get isPriceComparison(): boolean {
    const price = this.productForm.get('price')?.value;
    const oldPrice = this.productForm.get('oldPrice')?.value;
    return price && oldPrice && oldPrice > price;
  }
}
