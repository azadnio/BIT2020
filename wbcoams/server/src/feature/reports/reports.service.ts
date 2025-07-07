import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './repositories/reports.repository';
import {
  CustomerSalesReportDto,
  CustomerPaymentsReportDto,
  CustomerSpecificSalesReportDto,
  ReturnChequesReportDto,
  SalesPaymentComparisonReportDto,
  LegacySalesReportDto,
  CustomerHistoryDto,
} from './dto/report-response.dto';
import { IReportDateRange } from '@SharedRepo/interfaces/report.interface';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  async customerSalesReport({ from, to }: { from?: string; to?: string }): Promise<CustomerSalesReportDto[]> {
    const dateRange: IReportDateRange = { from, to };
    return await this.reportsRepository.getCustomerSalesReport(dateRange);
  }

  async customerPaymentsReport({ from, to }: { from?: string; to?: string }): Promise<CustomerPaymentsReportDto[]> {
    const dateRange: IReportDateRange = { from, to };
    return await this.reportsRepository.getCustomerPaymentsReport(dateRange);
  }

  async customerSpecificSalesReport(customerId: string, { from, to }: { from?: string; to?: string }): Promise<CustomerSpecificSalesReportDto[]> {
    const dateRange: IReportDateRange = { from, to };
    
    // Validate customer exists
    const customerExists = await this.reportsRepository.validateCustomerExists(customerId);
    if (!customerExists) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    
    return await this.reportsRepository.getCustomerSpecificSalesReport(customerId, dateRange);
  }

  async returnChequesReport({ from, to }: { from?: string; to?: string }): Promise<ReturnChequesReportDto[]> {
    const dateRange: IReportDateRange = { from, to };
    return await this.reportsRepository.getReturnChequesReport(dateRange);
  }

  async salesPaymentComparisonReport({ from, to }: { from?: string; to?: string }): Promise<SalesPaymentComparisonReportDto[]> {
    const dateRange: IReportDateRange = { from, to };
    return await this.reportsRepository.getSalesPaymentComparisonReport(dateRange);
  }

  // Legacy methods for backward compatibility
  async salesReport({ from, to }: { from: any; to: any }): Promise<LegacySalesReportDto> {
    const dateRange: IReportDateRange = { from, to };
    return await this.reportsRepository.getLegacySalesReport(dateRange);
  }

  async customerHistory(customerId: number): Promise<CustomerHistoryDto> {
    const result = await this.reportsRepository.getCustomerHistory(customerId);
    return {
      orders: result.orders,
      payments: result.payments
    };
  }

  // Additional business logic methods
  async getCustomerSummary(customerId: string, { from, to }: { from?: string; to?: string }) {
    const dateRange: IReportDateRange = { from, to };
    
    // Validate customer exists
    const customerExists = await this.reportsRepository.validateCustomerExists(customerId);
    if (!customerExists) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const [salesTotal, paymentsTotal, salesDetails] = await Promise.all([
      this.reportsRepository.getCustomerSalesTotal(customerId, dateRange),
      this.reportsRepository.getCustomerPaymentsTotal(customerId, dateRange),
      this.reportsRepository.getCustomerSpecificSalesReport(customerId, dateRange)
    ]);

    return {
      customerId,
      dateRange,
      summary: {
        totalSales: salesTotal,
        totalPayments: paymentsTotal,
        balance: salesTotal - paymentsTotal,
        transactionCount: salesDetails.length
      },
      transactions: salesDetails
    };
  }

  async getReportMetadata() {
    const dateRange = await this.reportsRepository.getReportDateRange();
    return {
      availableDateRange: dateRange,
      reportTypes: [
        'customer-sales',
        'customer-payments', 
        'customer-specific-sales',
        'return-cheques',
        'sales-payment-comparison'
      ]
    };
  }
}
