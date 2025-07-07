import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CustomerSalesReport,
  CustomerPaymentsReport,
  CustomerSpecificSalesReport,
  ReturnChequesReport,
  SalesPaymentComparisonReport,
  LegacySalesReport,
  CustomerHistory,
  CustomerSummary,
  ReportMetadata,
  ReportQueryParams,
} from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/reports';

  /**
   * Get customer sales report
   */
  getCustomerSalesReport(params?: ReportQueryParams): Observable<CustomerSalesReport[]> {
    let httpParams = new HttpParams();
    if (params?.from) httpParams = httpParams.set('from', params.from);
    if (params?.to) httpParams = httpParams.set('to', params.to);
    
    return this.http.get<CustomerSalesReport[]>(`${this.API_URL}/customer-sales`, { params: httpParams });
  }

  /**
   * Get customer payments report
   */
  getCustomerPaymentsReport(params?: ReportQueryParams): Observable<CustomerPaymentsReport[]> {
    let httpParams = new HttpParams();
    if (params?.from) httpParams = httpParams.set('from', params.from);
    if (params?.to) httpParams = httpParams.set('to', params.to);
    
    return this.http.get<CustomerPaymentsReport[]>(`${this.API_URL}/customer-payments`, { params: httpParams });
  }

  /**
   * Get customer specific sales report
   */
  getCustomerSpecificSalesReport(
    customerId: string, 
    params?: ReportQueryParams
  ): Observable<CustomerSpecificSalesReport[]> {
    let httpParams = new HttpParams();
    if (params?.from) httpParams = httpParams.set('from', params.from);
    if (params?.to) httpParams = httpParams.set('to', params.to);
    
    return this.http.get<CustomerSpecificSalesReport[]>(
      `${this.API_URL}/customer-specific-sales/${customerId}`,
      { params: httpParams }
    );
  }

  /**
   * Get return cheques report
   */
  getReturnChequesReport(params?: ReportQueryParams): Observable<ReturnChequesReport[]> {
    let httpParams = new HttpParams();
    if (params?.from) httpParams = httpParams.set('from', params.from);
    if (params?.to) httpParams = httpParams.set('to', params.to);
    
    return this.http.get<ReturnChequesReport[]>(`${this.API_URL}/return-cheques`, { params: httpParams });
  }

  /**
   * Get sales and payment comparison report
   */
  getSalesPaymentComparisonReport(params?: ReportQueryParams): Observable<SalesPaymentComparisonReport[]> {
    let httpParams = new HttpParams();
    if (params?.from) httpParams = httpParams.set('from', params.from);
    if (params?.to) httpParams = httpParams.set('to', params.to);
    
    return this.http.get<SalesPaymentComparisonReport[]>(
      `${this.API_URL}/sales-payment-comparison`,
      { params: httpParams }
    );
  }

  /**
   * Get customer summary (enhanced endpoint)
   */
  getCustomerSummary(customerId: string, params?: ReportQueryParams): Observable<CustomerSummary> {
    let httpParams = new HttpParams();
    if (params?.from) httpParams = httpParams.set('from', params.from);
    if (params?.to) httpParams = httpParams.set('to', params.to);
    
    return this.http.get<CustomerSummary>(
      `${this.API_URL}/customer-summary/${customerId}`,
      { params: httpParams }
    );
  }

  /**
   * Get report metadata
   */
  getReportMetadata(): Observable<ReportMetadata> {
    return this.http.get<ReportMetadata>(`${this.API_URL}/metadata`);
  }

  // Legacy methods for backward compatibility
  
  /**
   * Legacy: Get sales report
   */
  getLegacySalesReport(from: string, to: string): Observable<LegacySalesReport> {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to);
    
    return this.http.get<LegacySalesReport>(`${this.API_URL}/sales`, { params });
  }

  /**
   * Legacy: Get customer history
   */
  getCustomerHistory(customerId: number): Observable<CustomerHistory> {
    return this.http.get<CustomerHistory>(`${this.API_URL}/customer/${customerId}`);
  }

  // Utility methods
  
  /**
   * Generate all reports for a date range
   */
  generateAllReports(params?: ReportQueryParams): Observable<{
    customerSales: CustomerSalesReport[];
    customerPayments: CustomerPaymentsReport[];
    returnCheques: ReturnChequesReport[];
    salesPaymentComparison: SalesPaymentComparisonReport[];
  }> {
    // This could be implemented as a single endpoint on the server
    // or we can make multiple calls and combine them
    const customerSales$ = this.getCustomerSalesReport(params);
    const customerPayments$ = this.getCustomerPaymentsReport(params);
    const returnCheques$ = this.getReturnChequesReport(params);
    const salesPaymentComparison$ = this.getSalesPaymentComparisonReport(params);

    // Using forkJoin to make all requests in parallel
    return new Observable(observer => {
      Promise.all([
        customerSales$.toPromise(),
        customerPayments$.toPromise(),
        returnCheques$.toPromise(),
        salesPaymentComparison$.toPromise()
      ]).then(([customerSales, customerPayments, returnCheques, salesPaymentComparison]) => {
        observer.next({
          customerSales: customerSales || [],
          customerPayments: customerPayments || [],
          returnCheques: returnCheques || [],
          salesPaymentComparison: salesPaymentComparison || []
        });
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  /**
   * Export report data (future implementation)
   */
  exportReport(reportType: string, format: 'pdf' | 'excel', params?: ReportQueryParams): Observable<Blob> {
    let httpParams = new HttpParams()
      .set('format', format);
    if (params?.from) httpParams = httpParams.set('from', params.from);
    if (params?.to) httpParams = httpParams.set('to', params.to);
    
    return this.http.get(`${this.API_URL}/export/${reportType}`, {
      params: httpParams,
      responseType: 'blob'
    });
  }
}
