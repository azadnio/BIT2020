import { Customer } from './user.model';
import { Product } from './product.model';

export interface Invoice {
  id: number;
  customerId: number;
  invoiceDate: string;
  subTotal: number;
  discount: number;
  total: number;
  dueDate?: string;
  remarks?: string;
  status: 'draft' | 'finalized' | 'paid' | 'cancelled';
  isActive: boolean;
  createdAt: string;
  createdUserId: number;
  updatedAt: string;
  updatedUserId: number;
  customer?: Customer;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  invoiceId: number;
  itemId: number;
  quantity: number;
  price: number;
  product?: Product;
}
