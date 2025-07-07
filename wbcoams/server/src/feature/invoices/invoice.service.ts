import { BadRequestException, Injectable } from '@nestjs/common';
import { InvoicePaginationDto } from './dtos/invoice-pagination.dto';
import { CereateInvoiceDto } from './dtos/create-invoice.dto';
import { UpdateInvoiceDto } from './dtos/update-invoice.dto';
import { DeleteQueryDto } from 'src/common/dto/delete-query.dto';
// import { CustomersService } from 'src/customers/customers.service';
import { CustomersService } from '../customers/customers.service';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { InvoiceItemRepository } from './repositories/invoice-item.repository';
import { LogService } from 'src/core/log/log.service';
import { IInvoice } from '@SharedRepo/interfaces/invoice.interface';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly context: RequestContextService,
    private readonly customerService: CustomersService,
    private readonly invoiceRepository: InvoiceRepository,
    private readonly invoiceItemRepository: InvoiceItemRepository,
    private readonly logService: LogService
  ) {}

  // Create Invoice with Items
  async createInvoice(invoice: CereateInvoiceDto) {
    this.additionalInvoiceValidation(invoice as IInvoice);

    const createdInvoice = await this.invoiceRepository.withMultipleTransaction(async () => {
      //get customer balance
      const customerCreditInfo = await this.customerService.getCustomerCreditInfo(invoice.customerId);
      const newCreditBalance = +customerCreditInfo.creditBalance + invoice.total;

      if (newCreditBalance > +customerCreditInfo.creditLimit) {
        throw new BadRequestException(
          `Customer's credit balance is insufficient. Current balance: ${customerCreditInfo.creditLimit}, Invoice total: ${invoice.total}`
        );
      }

      (invoice as IInvoice).createdUserId = this.context.userId;
      (invoice as IInvoice).updatedUserId = this.context.userId;
      const invoiceId = await this.invoiceRepository.create(invoice as IInvoice);

      if (!invoiceId) {
        throw new BadRequestException('Failed to create invoice.');
      }

      // Insert invoice items
      const isItemsAdded = await this.invoiceItemRepository.insertInvoiceItems(invoiceId, invoice.items);
      if (!isItemsAdded) {
        throw new BadRequestException('Failed to add invoice items.');
      }

      // Update customer's credit balance
      await this.customerService.updateCustomerCreditBalance(invoice.customerId, newCreditBalance);
      const savedInvoice = await this.getInvoiceById(invoiceId);
      return savedInvoice;
    }, true);

    this.logService.creation(createdInvoice.id, 'Invoice created successfully with ID: ' + createdInvoice.id);
    return createdInvoice;
  }

  // Get Invoice by ID (with items)
  async getInvoiceById(id: number) {
    const invoice = await this.invoiceRepository.selectById(id);
    if (!invoice) {
      throw new BadRequestException(`Invoice with ID ${id} not found.`);
    }
    invoice.items = await this.invoiceItemRepository.getInvoiceItems(id);
    return invoice as IInvoice;
  }

  async getCustomerInvoices(customerId: number, query: InvoicePaginationDto) {
    if (query.from && query.to && new Date(query.from) > new Date(query.to)) {
      throw new Error('Invalid date range: "from" date cannot be after "to" date.');
    }

    let invoices = await this.invoiceRepository.getInvoicesByCustomerId(customerId, query);
    if (query.withItems) {
      return (await this.appendInvoiceItems(invoices)) as IInvoice[];
    }
    return invoices;
  }

  // Get All Invoices (optionally with items)
  async getAllInvoices(query: InvoicePaginationDto) {
    if (query.from && query.to && new Date(query.from) > new Date(query.to)) {
      throw new Error('Invalid date range: "from" date cannot be after "to" date.');
    }
    const invoices = await this.invoiceRepository.selectAll(query);
    if (query.withItems) {
      return (await this.appendInvoiceItems(invoices)) as IInvoice[];
    }
    return invoices;
  }

  // Update Invoice and Items
  async updateInvoice(id: number, invoiceData: UpdateInvoiceDto) {
    this.additionalInvoiceValidation(invoiceData as IInvoice);

    const updatedInvoice = await this.invoiceRepository.withMultipleTransaction(async () => {
      const existingInvoice = await this.invoiceRepository.selectById(id);
      if (!existingInvoice) {
        throw new Error(`Invoice with ID ${id} not found.`);
      }

      const updatingInvoiceTotal = invoiceData.total - existingInvoice.total;
      const { items, ...mainFields } = invoiceData;
      (mainFields as IInvoice).updatedUserId = this.context.userId;

      await this.customerService.updateCustomerCreditBalance(existingInvoice.customerId, updatingInvoiceTotal);
      await this.invoiceRepository.update(id, mainFields as IInvoice);
      await this.invoiceItemRepository.deleteInvoiceItems(id);
      await this.invoiceItemRepository.insertInvoiceItems(id, items);

      return await this.getInvoiceById(id);
    }, true);

    this.logService.updation(updatedInvoice.id, 'Invoice updated successfully with ID: ' + updatedInvoice.id);
    return updatedInvoice;
  }

  // Delete Invoice and Items
  async deleteInvoice(id: number, query: DeleteQueryDto) {
    const deletingInvoice = await this.invoiceRepository.selectById(id);
    if (!deletingInvoice) {
      throw new BadRequestException(`Invoice with ID ${id} not found.`);
    }
    if (query.forceDelete && !this.context.isAdmin()) {
      throw new BadRequestException('Force delete is not allowed for your role.');
    }
    if (this.context.isStaff() && deletingInvoice.createdUserId !== this.context.userId) {
      throw new BadRequestException('You do not have permission to delete this invoice.');
    }

    const isDeleted = await this.invoiceRepository.withMultipleTransaction(async () => {
      let result = query.forceDelete
        ? await this.invoiceRepository.forceDelete(id)
        : await this.invoiceRepository.delete(id, this.context.userId);

      if (!result) {
        throw new BadRequestException(`Invoice with ID ${id} could not be deleted.`);
      }

      await this.invoiceItemRepository.deleteInvoiceItems(id);
      // Update customer's credit balance
      await this.customerService.updateCustomerCreditBalance(deletingInvoice.customerId, -deletingInvoice.total);

      return true;
    }, true);

    this.logService.deletion(id, `Invoice with ID ${id} deleted ${query.forceDelete ? 'permanently' : 'softly'}`);
    // Log force delete action
    if (query.forceDelete) {
      this.logService.saveImportantLogToFile(
        `Invoice with ID ${id} was force deleted by user ID ${this.context.userId}. \n ${JSON.stringify(deletingInvoice)}`,
        'force-delete-invoice.log'
      );
    }

    return isDeleted;
  }

  // Append invoice items to the invoice object
  private async appendInvoiceItems(invoice: IInvoice | IInvoice[]): Promise<IInvoice | IInvoice[]> {
    if (Array.isArray(invoice)) {
      for (const inv of invoice) {
        inv.items = await this.invoiceItemRepository.getInvoiceItems(inv.id);
      }
      return invoice;
    }
    invoice.items = await this.invoiceItemRepository.getInvoiceItems(invoice.id);
    return invoice;
  }

  private additionalInvoiceValidation(invoice: IInvoice): boolean {
    if (invoice.items.some((item) => item.price < 0 || item.quantity < 0)) {
      throw new BadRequestException('Invalid invoice data: item price and quantity cannot be negative.');
    }

    const itemsTotal = invoice.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
    if (invoice.subTotal !== itemsTotal) {
      throw new BadRequestException(
        `Invoice subTotal does not match the total of items. Expected: ${itemsTotal}, Provided: ${invoice.subTotal}`
      );
    }

    if (invoice.total !== itemsTotal - invoice.discount) {
      throw new BadRequestException(
        `Invoice total does not match the subtracted discount from items total. Expected: ${itemsTotal - invoice.discount}, Provided: ${invoice.total}`
      );
    }

    if (invoice.items && invoice.items.length === 0) {
      throw new BadRequestException('Invalid invoice data: items cannot be empty.');
    }

    if (invoice.discount < 0) {
      throw new Error('Invalid invoice data: discount cannot be negative.');
    }

    return true;
  }
}

/**
 * CREATE TABLE `invoices` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`customerId` INT(10) NOT NULL,
	`total` DOUBLE NOT NULL DEFAULT '0',
	`inoviceDate` TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`discount` DOUBLE NOT NULL DEFAULT '0',
	`remarks` TEXT NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`status` TINYINT(3) NOT NULL DEFAULT '0',
	`createdUserId` INT(10) NOT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`updatedUserId` INT(10) NOT NULL,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`) USING BTREE
)
 */

/**
 * CREATE TABLE `invoice_items` (
	`invoiceId` INT(10) NOT NULL,
	`itemId` INT(10) NOT NULL,
	`price` DOUBLE NOT NULL,
	`quantity` DOUBLE NOT NULL
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

 */
