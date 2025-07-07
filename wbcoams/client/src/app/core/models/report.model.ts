export interface CustomerSalesReport {
  customerId: string;
  name: string;
  city: string;
  purchases: number;
}

export interface CustomerPaymentsReport {
  customerId: string;
  name: string;
  city: string;
  amount: number;
}

export interface CustomerSpecificSalesReport {
  invoiceNo: string;
  date: string;
  amount: number;
}

export interface ReturnChequesReport {
  cusId: string;
  customerName: string;
  city: string;
  chequeNo: string;
  amount: number;
}

export interface SalesPaymentComparisonReport {
  cusId: string;
  customerName: string;
  city: string;
  sales: number;
  payments: number;
}

export interface LegacySalesReport {
  total_sales: number;
}

export interface CustomerHistory {
  orders: any[];
  payments: any[];
}

export interface CustomerSummary {
  customerId: string;
  dateRange: {
    from?: string;
    to?: string;
  };
  summary: {
    totalSales: number;
    totalPayments: number;
    balance: number;
    transactionCount: number;
  };
  transactions: CustomerSpecificSalesReport[];
}

export interface ReportMetadata {
  availableDateRange: {
    minDate: string;
    maxDate: string;
  };
  reportTypes: string[];
}

export interface ReportQueryParams {
  from?: string;
  to?: string;
}
