import { Product } from './product.model';
import { Customer } from './user.model';

export interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'on_hold';
  remarks?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
  price: number;
  product?: Product;
}
