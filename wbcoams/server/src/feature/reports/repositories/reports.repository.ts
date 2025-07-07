import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';
import {
  ICustomerSalesReport,
  ICustomerPaymentsReport,
  ICustomerSpecificSalesReport,
  IReturnChequesReport,
  ISalesPaymentComparisonReport,
  IReportDateRange,
  ILegacySalesReport,
  ICustomerHistory,
} from '@SharedRepo/interfaces/report.interface';

@Injectable()
export class ReportsRepository extends BaseRepository<any, PaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'reports'; // Not used for reports, but required by base class
    this.hasCreatedColumns = false;
    this.hasUpdatedColumns = false;
    this.hasSoftDelete = false;
  }

  // Base repository abstract methods (not used for reports but required)
  protected async selectById(id: number): Promise<any> {
    throw new Error('Method not implemented for reports');
  }

  protected async selectAll(queryParams: IPagination): Promise<any[]> {
    throw new Error('Method not implemented for reports');
  }

  protected async create(entity: Partial<any>): Promise<number> {
    throw new Error('Method not implemented for reports');
  }

  protected async update(id: number, entity: Partial<any>): Promise<boolean> {
    throw new Error('Method not implemented for reports');
  }

  protected async delete(id: number, deletedBy: number): Promise<boolean> {
    throw new Error('Method not implemented for reports');
  }

  protected async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T> {
    return await this.db.withMultipleTransaction(runInTransaction, isContinueTransaction);
  }

  // Report-specific methods
  public async getCustomerSalesReport(dateRange: IReportDateRange): Promise<ICustomerSalesReport[]> {
    const fromDate = dateRange.from || '1900-01-01';
    const toDate = dateRange.to || '2099-12-31';
    
    const sql = `
      SELECT 
        c.id as customerId,
        CONCAT(c.name, ', ', c.city) as name,
        c.city,
        COALESCE(SUM(o.total_amount), 0) as purchases
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id 
        AND o.created_at BETWEEN ? AND ? 
        AND o.status != 'cancelled'
      GROUP BY c.id, c.name, c.city
      HAVING purchases > 0
      ORDER BY purchases DESC`;
    
    const rows = await this.db.query<ICustomerSalesReport[]>(sql, [fromDate, toDate]);
    return Array.isArray(rows) ? rows : [];
  }

  public async getCustomerPaymentsReport(dateRange: IReportDateRange): Promise<ICustomerPaymentsReport[]> {
    const fromDate = dateRange.from || '1900-01-01';
    const toDate = dateRange.to || '2099-12-31';
    
    const sql = `
      SELECT 
        c.id as customerId,
        CONCAT(c.name, ', ', c.city) as name,
        c.city,
        COALESCE(SUM(p.amount), 0) as amount
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      LEFT JOIN payments p ON o.id = p.order_id 
        AND p.payment_date BETWEEN ? AND ? 
        AND p.status = 'completed'
      GROUP BY c.id, c.name, c.city
      HAVING amount > 0
      ORDER BY amount DESC`;
    
    const rows = await this.db.query<ICustomerPaymentsReport[]>(sql, [fromDate, toDate]);
    return Array.isArray(rows) ? rows : [];
  }

  public async getCustomerSpecificSalesReport(
    customerId: string,
    dateRange: IReportDateRange
  ): Promise<ICustomerSpecificSalesReport[]> {
    const fromDate = dateRange.from || '1900-01-01';
    const toDate = dateRange.to || '2099-12-31';
    
    const sql = `
      SELECT 
        o.invoice_number as invoiceNo,
        DATE_FORMAT(o.created_at, '%d-%m-%Y') as date,
        o.total_amount as amount
      FROM orders o
      WHERE o.customer_id = ? 
        AND o.created_at BETWEEN ? AND ?
        AND o.status != 'cancelled'
      ORDER BY o.created_at DESC`;
    
    const rows = await this.db.query<ICustomerSpecificSalesReport[]>(sql, [customerId, fromDate, toDate]);
    return Array.isArray(rows) ? rows : [];
  }

  public async getReturnChequesReport(dateRange: IReportDateRange): Promise<IReturnChequesReport[]> {
    const fromDate = dateRange.from || '1900-01-01';
    const toDate = dateRange.to || '2099-12-31';
    
    const sql = `
      SELECT 
        c.id as cusId,
        CONCAT(c.name, ', ', c.city) as customerName,
        c.city,
        ch.cheque_number as chequeNo,
        ch.amount
      FROM customers c
      JOIN orders o ON c.id = o.customer_id
      JOIN cheques ch ON o.id = ch.order_id
      WHERE ch.status = 'returned'
        AND ch.created_at BETWEEN ? AND ?
      ORDER BY ch.created_at DESC`;
    
    const rows = await this.db.query<IReturnChequesReport[]>(sql, [fromDate, toDate]);
    return Array.isArray(rows) ? rows : [];
  }

  public async getSalesPaymentComparisonReport(dateRange: IReportDateRange): Promise<ISalesPaymentComparisonReport[]> {
    const fromDate = dateRange.from || '1900-01-01';
    const toDate = dateRange.to || '2099-12-31';
    
    const sql = `
      SELECT 
        c.id as cusId,
        CONCAT(c.name, ', ', c.city) as customerName,
        c.city,
        COALESCE(SUM(o.total_amount), 0) as sales,
        COALESCE(SUM(p.amount), 0) as payments
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id 
        AND o.created_at BETWEEN ? AND ? 
        AND o.status != 'cancelled'
      LEFT JOIN payments p ON o.id = p.order_id 
        AND p.payment_date BETWEEN ? AND ? 
        AND p.status = 'completed'
      GROUP BY c.id, c.name, c.city
      HAVING sales > 0 OR payments > 0
      ORDER BY sales DESC`;
    
    const rows = await this.db.query<ISalesPaymentComparisonReport[]>(sql, [fromDate, toDate, fromDate, toDate]);
    return Array.isArray(rows) ? rows : [];
  }

  // Legacy methods for backward compatibility
  public async getLegacySalesReport(dateRange: IReportDateRange): Promise<ILegacySalesReport> {
    const sql = `
      SELECT SUM(amount) as total_sales 
      FROM payments 
      WHERE payment_date BETWEEN ? AND ? 
        AND status = 'completed'`;
    
    const [row] = await this.db.query<ILegacySalesReport[]>(sql, [dateRange.from, dateRange.to]);
    return row || { total_sales: 0 };
  }

  public async getCustomerHistory(customerId: number): Promise<ICustomerHistory> {
    const ordersQuery = 'SELECT * FROM orders WHERE customer_id = ?';
    const paymentsQuery = `
      SELECT * FROM payments 
      WHERE order_id IN (SELECT id FROM orders WHERE customer_id = ?)`;
    
    const orders = await this.db.query<any[]>(ordersQuery, [customerId]);
    const payments = await this.db.query<any[]>(paymentsQuery, [customerId]);
    
    return {
      orders: Array.isArray(orders) ? orders : [],
      payments: Array.isArray(payments) ? payments : []
    };
  }

  // Additional utility methods
  public async validateCustomerExists(customerId: string): Promise<boolean> {
    const sql = 'SELECT COUNT(*) as count FROM customers WHERE id = ?';
    const [result] = await this.db.query<{ count: number }[]>(sql, [customerId]);
    return result && result.count > 0;
  }

  public async getReportDateRange(): Promise<{ minDate: string; maxDate: string }> {
    const sql = `
      SELECT 
        MIN(created_at) as minDate,
        MAX(created_at) as maxDate
      FROM orders
      WHERE status != 'cancelled'`;
    
    const [result] = await this.db.query<{ minDate: string; maxDate: string }[]>(sql);
    return result || { minDate: '1900-01-01', maxDate: '2099-12-31' };
  }

  public async getCustomerSalesTotal(customerId: string, dateRange: IReportDateRange): Promise<number> {
    const fromDate = dateRange.from || '1900-01-01';
    const toDate = dateRange.to || '2099-12-31';
    
    const sql = `
      SELECT COALESCE(SUM(total_amount), 0) as total
      FROM orders
      WHERE customer_id = ? 
        AND created_at BETWEEN ? AND ?
        AND status != 'cancelled'`;
    
    const [result] = await this.db.query<{ total: number }[]>(sql, [customerId, fromDate, toDate]);
    return result ? result.total : 0;
  }

  public async getCustomerPaymentsTotal(customerId: string, dateRange: IReportDateRange): Promise<number> {
    const fromDate = dateRange.from || '1900-01-01';
    const toDate = dateRange.to || '2099-12-31';
    
    const sql = `
      SELECT COALESCE(SUM(p.amount), 0) as total
      FROM payments p
      JOIN orders o ON p.order_id = o.id
      WHERE o.customer_id = ? 
        AND p.payment_date BETWEEN ? AND ?
        AND p.status = 'completed'`;
    
    const [result] = await this.db.query<{ total: number }[]>(sql, [customerId, fromDate, toDate]);
    return result ? result.total : 0;
  }
}
