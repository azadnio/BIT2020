import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  product: Product | null = null;
  isLoading = false;
  productId: number | null = null;
  quantity = 1;

  // Hardcoded product for demonstration
  private hardcodedProduct: Product = {
    id: 1,
    isActive: true,
    description: "DeWalt 20V MAX Cordless Drill Kit",
    info: "Professional grade cordless drill with 2-speed transmission, 1/2-inch self-tightening chuck, and LED light. Includes two 20V MAX batteries, charger, and contractor bag. Perfect for drilling and fastening applications.",
    categoryId: 1,
    price: 5999.99,
    brandId: 1,
    unit: "Nos",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop&crop=center",
    oldPrice: 6999.99,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-06-01T14:20:00Z",
    category: {
      id: 1,
      name: "Power Tools",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    brand: {
      id: 1,
      name: "DeWalt",
      logo: "https://via.placeholder.com/100x50/FFD700/000000?text=DeWalt",
      isActive: true,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    createdUserId: 1,
    updatedUserId: 2
  };

  // Hardcoded user data for demonstration
  private users = {
    1: { id: 1, name: "Mohamed Silmy", role: "Product Manager" },
    2: { id: 2, name: "Mohamed Silmy", role: "Inventory Manager" }
  };

  getCreatedByUser(): any {
    return this.users[this.product?.createdUserId as keyof typeof this.users] || null;
  }

  getUpdatedByUser(): any {
    return this.users[this.product?.updatedUserId as keyof typeof this.users] || null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      // Use hardcoded product instead of API call
      this.loadHardcodedProduct();
    });
  }

  loadHardcodedProduct(): void {
    this.isLoading = true;
    
    // Simulate loading delay
    setTimeout(() => {
      this.product = this.hardcodedProduct;
      this.isLoading = false;
    }, 500);
  }

  addToCart(): void {
    if (!this.product) return;
    
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', this.product, 'Quantity:', this.quantity);
    this.snackBar.open(`${this.quantity} ${this.product.description} added to cart!`, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  buyNow(): void {
    if (!this.product) return;
    
    // TODO: Implement buy now functionality (redirect to checkout)
    console.log('Buy now:', this.product, 'Quantity:', this.quantity);
    this.snackBar.open('Redirecting to checkout...', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    
    // Simulate redirect to checkout
    setTimeout(() => {
      // this.router.navigate(['/checkout'], { 
      //   queryParams: { productId: this.product!.id, quantity: this.quantity }
      // });
      console.log('Would redirect to checkout with product:', this.product!.id, 'quantity:', this.quantity);
    }, 2000);
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  shareProduct(): void {
    if (navigator.share && this.product) {
      navigator.share({
        title: this.product.description,
        text: `Check out this product: ${this.product.description}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.snackBar.open('Product URL copied to clipboard!', 'Close', {
          duration: 3000,
        });
      });
    }
  }

  onImageError(event: any): void {
    // Fallback to placeholder images if the original image fails to load
    const fallbackImages = [
      'https://picsum.photos/600/400?grayscale&blur=1',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop&crop=center'
    ];
    
    const currentSrc = event.target.src;
    const currentIndex = fallbackImages.findIndex(img => currentSrc.includes(img.split('?')[0]));
    
    if (currentIndex < fallbackImages.length - 1) {
      event.target.src = fallbackImages[currentIndex + 1];
    } else if (!fallbackImages.some(img => currentSrc.includes(img.split('?')[0]))) {
      // If it's not a fallback image yet, try the first fallback
      event.target.src = fallbackImages[0];
    } else {
      // If all fallbacks fail, hide the image and show a placeholder
      event.target.style.display = 'none';
      const parent = event.target.parentElement;
      if (parent && !parent.querySelector('.image-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder detail-placeholder';
        placeholder.innerHTML = '<mat-icon>image</mat-icon><p>Image not available</p>';
        parent.appendChild(placeholder);
      }
    }
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
