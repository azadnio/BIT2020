import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  updatedAt: string;
  customer?: any;
  items?: any[];
}

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/invoices';

  getInvoices(
    params?: any,
  ): Observable<{ invoices: Invoice[]; total: number }> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<{ invoices: Invoice[]; total: number }>(this.API_URL, {
      params: httpParams,
    });
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.API_URL}/${id}`);
  }

  getCustomerInvoices(customerId: number, params?: any): Observable<Invoice[]> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<Invoice[]>(`${this.API_URL}/customer/${customerId}`, {
      params: httpParams,
    });
  }

  createInvoice(invoice: Partial<Invoice>): Observable<Invoice> {
    return this.http.post<Invoice>(this.API_URL, invoice);
  }

  updateInvoice(id: number, invoice: Partial<Invoice>): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.API_URL}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
