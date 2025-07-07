import { Controller, Get, Query, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { ReportQueryDto } from './dto/report-query.dto';
import {
  CustomerSalesReportDto,
  CustomerPaymentsReportDto,
  CustomerSpecificSalesReportDto,
  ReturnChequesReportDto,
  SalesPaymentComparisonReportDto,
  LegacySalesReportDto,
  CustomerHistoryDto,
} from './dto/report-response.dto';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('customer-sales')
  async customerSales(@Query(ValidationPipe) query: ReportQueryDto): Promise<CustomerSalesReportDto[]> {
    return this.service.customerSalesReport(query);
  }

  @Get('customer-payments')
  async customerPayments(@Query(ValidationPipe) query: ReportQueryDto): Promise<CustomerPaymentsReportDto[]> {
    return this.service.customerPaymentsReport(query);
  }

  @Get('customer-specific-sales/:customerId')
  async customerSpecificSales(
    @Param('customerId') customerId: string,
    @Query(ValidationPipe) query: ReportQueryDto
  ): Promise<CustomerSpecificSalesReportDto[]> {
    return this.service.customerSpecificSalesReport(customerId, query);
  }

  @Get('return-cheques')
  async returnCheques(@Query(ValidationPipe) query: ReportQueryDto): Promise<ReturnChequesReportDto[]> {
    return this.service.returnChequesReport(query);
  }

  @Get('sales-payment-comparison')
  async salesPaymentComparison(@Query(ValidationPipe) query: ReportQueryDto): Promise<SalesPaymentComparisonReportDto[]> {
    return this.service.salesPaymentComparisonReport(query);
  }

  // Legacy endpoint for backward compatibility
  @Get('sales')
  async sales(@Query('from') from: string, @Query('to') to: string): Promise<LegacySalesReportDto> {
    return this.service.salesReport({ from, to });
  }

  // Legacy endpoint for backward compatibility
  @Get('customer/:id')
  async customer(@Param('id') id: string): Promise<CustomerHistoryDto> {
    return this.service.customerHistory(Number(id));
  }

  // Additional business logic endpoints
  @Get('customer-summary/:customerId')
  async customerSummary(
    @Param('customerId') customerId: string,
    @Query(ValidationPipe) query: ReportQueryDto
  ) {
    return this.service.getCustomerSummary(customerId, query);
  }

  @Get('metadata')
  async getReportMetadata() {
    return this.service.getReportMetadata();
  }
}
