import { IBaseEntity } from './base-entity.interface';

export interface ICustomerSalesReport {
  customerId: string;
  name: string;
  city: string;
  purchases: number;
}

export interface ICustomerPaymentsReport {
  customerId: string;
  name: string;
  city: string;
  amount: number;
}

export interface ICustomerSpecificSalesReport {
  invoiceNo: string;
  date: string;
  amount: number;
}

export interface IReturnChequesReport {
  cusId: string;
  customerName: string;
  city: string;
  chequeNo: string;
  amount: number;
}

export interface ISalesPaymentComparisonReport {
  cusId: string;
  customerName: string;
  city: string;
  sales: number;
  payments: number;
}

export interface IReportDateRange {
  from?: string;
  to?: string;
}

export interface ILegacySalesReport {
  total_sales: number;
}

export interface ICustomerHistory {
  orders: any[];
  payments: any[];
}
