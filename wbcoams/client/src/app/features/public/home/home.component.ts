import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProductService } from '../../../core/services/product.service';
// import { Product } from '../../../core/models/product.model';
import { IItem} from '@sharedlib/interfaces/item.interface'; // Adjust the import path as necessary
// import { ExampleUsageComponent } from '@shared/components/product-card/USAGE_EXAMPLE';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    ProductCardComponent
    // ExampleUsageComponent, // Assuming this is a component that uses ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);

  featuredProducts: IItem[] = [];

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  private loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe({
      next: (products) => { console.log(products)
        this.featuredProducts = products;
      },
      error: (error) => {
        console.error('Error loading featured products:', error);
      },
    });
  }
}
