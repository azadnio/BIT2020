import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/customers';

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_URL);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}/${id}`);
  }

  getCustomerByUserId(userId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}/user/${userId}`);
  }

  updateCustomer(
    id: number,
    customer: Partial<Customer>,
  ): Observable<Customer> {
    return this.http.put<Customer>(`${this.API_URL}/${id}`, customer);
  }

  createCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.API_URL, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
