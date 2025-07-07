export interface CustomerSalesReportDto {
  customerId: string;
  name: string;
  city: string;
  purchases: number;
}

export interface CustomerPaymentsReportDto {
  customerId: string;
  name: string;
  city: string;
  amount: number;
}

export interface CustomerSpecificSalesReportDto {
  invoiceNo: string;
  date: string;
  amount: number;
}

export interface ReturnChequesReportDto {
  cusId: string;
  customerName: string;
  city: string;
  chequeNo: string;
  amount: number;
}

export interface SalesPaymentComparisonReportDto {
  cusId: string;
  customerName: string;
  city: string;
  sales: number;
  payments: number;
}

export interface LegacySalesReportDto {
  total_sales: number;
}

export interface CustomerHistoryDto {
  orders: any[];
  payments: any[];
}
