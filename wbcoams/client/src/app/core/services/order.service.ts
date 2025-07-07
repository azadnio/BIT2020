import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderItem } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/orders';

  getOrders(params?: any): Observable<{ orders: Order[]; total: number }> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<{ orders: Order[]; total: number }>(this.API_URL, {
      params: httpParams,
    });
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/${id}`);
  }

  getCustomerOrders(customerId: number, params?: any): Observable<Order[]> {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.http.get<Order[]>(`${this.API_URL}/customer/${customerId}`, {
      params: httpParams,
    });
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.API_URL, order);
  }

  updateOrder(id: number, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.API_URL}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  addOrderItem(
    orderId: number,
    item: Partial<OrderItem>,
  ): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.API_URL}/${orderId}/items`, item);
  }

  updateOrderItem(
    orderId: number,
    itemId: number,
    item: Partial<OrderItem>,
  ): Observable<OrderItem> {
    return this.http.put<OrderItem>(
      `${this.API_URL}/${orderId}/items/${itemId}`,
      item,
    );
  }

  removeOrderItem(orderId: number, itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${orderId}/items/${itemId}`);
  }
}
