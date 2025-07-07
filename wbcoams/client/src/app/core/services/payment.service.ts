import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, Cheque } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/payments';

  getPayments(
    params?: any,
  ): Observable<{ payments: Payment[]; total: number }> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<{ payments: Payment[]; total: number }>(this.API_URL, {
      params: httpParams,
    });
  }

  getPayment(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.API_URL}/${id}`);
  }

  getCustomerPayments(customerId: number, params?: any): Observable<Payment[]> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<Payment[]>(`${this.API_URL}/customer/${customerId}`, {
      params: httpParams,
    });
  }

  createPayment(payment: Partial<Payment>): Observable<Payment> {
    return this.http.post<Payment>(this.API_URL, payment);
  }

  updatePayment(id: number, payment: Partial<Payment>): Observable<Payment> {
    return this.http.put<Payment>(`${this.API_URL}/${id}`, payment);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Cheque methods
  getCheques(params?: any): Observable<{ cheques: Cheque[]; total: number }> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<{ cheques: Cheque[]; total: number }>(
      this.API_URL + '/cheques',
      { params: httpParams },
    );
  }

  createCheque(cheque: Partial<Cheque>): Observable<Cheque> {
    return this.http.post<Cheque>(this.API_URL + '/cheques', cheque);
  }

  updateCheque(id: number, cheque: Partial<Cheque>): Observable<Cheque> {
    return this.http.put<Cheque>(`${this.API_URL}/cheques/${id}`, cheque);
  }

  updateChequeStatus(
    id: number,
    status: 'pending' | 'passed' | 'returned',
  ): Observable<Cheque> {
    return this.http.patch<Cheque>(`${this.API_URL}/cheques/${id}/status`, {
      status,
    });
  }
}
