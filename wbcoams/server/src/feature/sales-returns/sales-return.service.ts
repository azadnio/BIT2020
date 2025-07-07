import { BadRequestException, Injectable } from '@nestjs/common';
// import { CustomersService } from 'src/customers/customers.service';
import { DeleteQueryDto } from 'src/common/dto/delete-query.dto';
import { SalesReturnDto } from './dtos/update-invoice.dto';
import { SalesReturnPaginationDto } from './dtos/sales-return-pagination.dto';
import { CreateSalesReturnDto } from './dtos/create-sales-return.dto';
import { ISalesReturn } from '@SharedRepo/interfaces/sales-return.interface';
import { SalesReturnItemRepository } from './repositories/sales-return-item.repository';
import { SalesReturnRepository } from './repositories/sales-return.repository';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { LogService } from 'src/core/log/log.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class SalesReturnService {
  constructor(
    private readonly salesReturnItemRepository: SalesReturnItemRepository,
    private readonly salesReturnRepository: SalesReturnRepository,
    private readonly customerService: CustomersService,
    private readonly context: RequestContextService,
    private readonly logService: LogService
  ) {}

  // Create Invoice with Items
  async createSalesReturns(salesReturn: CreateSalesReturnDto) {
    this.additionalSalesReturnValidation(salesReturn as ISalesReturn);

    const createdSalesReturn = await this.salesReturnRepository.withMultipleTransaction(async () => {
      const { items, ...salesReturnMainFields } = salesReturn;
      const createdUserId = this.context.userId;
      const salesReturnId = await this.salesReturnRepository.create({
        ...salesReturnMainFields,
        createdUserId,
        updatedUserId: createdUserId,
      });

      if (!salesReturnId) {
        throw new BadRequestException('Failed to create sales return.');
      }
      await this.salesReturnItemRepository.insertSalesReturnItems(salesReturnId, items);
      // Update customer's credit balance
      await this.customerService.updateCustomerCreditBalance(salesReturn.customerId, -salesReturn.total);
      return await this.salesReturnRepository.selectById(salesReturnId);
    }, true);

    if (!createdSalesReturn) {
      throw new BadRequestException('Failed to create sales return.');
    }

    // Log the creation of the sales return
    this.logService.creation(
      createdSalesReturn.id,
      'Sales return created successfully, total: ' + createdSalesReturn.total
    );
    return createdSalesReturn;
  }

  // Get Sales Return by ID (with items)
  async getSalesReturnById(srId: number) {
    const salesReturn = await this.salesReturnRepository.selectById(srId);
    if (!salesReturn) {
      throw new BadRequestException(`Sales return with ID ${srId} not found.`);
    }
    return await this.appendSalesReturnItems(salesReturn);
  }

  async getCustomerSalesReturns(customerId: number, query: SalesReturnPaginationDto) {
    const { withItems = false, from, to, includeDeleted = false } = query;

    if (from && to && new Date(from) > new Date(to)) {
      throw new Error('Invalid date range: "from" date cannot be after "to" date.');
    }
    if (includeDeleted && this.context.isCustomer()) {
      throw new BadRequestException('Customers cannot access deleted sales returns.');
    }

    const salesReturns = await this.salesReturnRepository.getSalesReturnsByCustomerId(customerId, query);
    if (!salesReturns || salesReturns.length === 0) {
      return [];
    }

    if (withItems) {
      return await this.appendSalesReturnItems(salesReturns);
    }
    return salesReturns;
  }

  // Get All Sales Returns (optionally with items)
  async getAllSalesReturns(query: SalesReturnPaginationDto) {
    if (this.context.isCustomer()) {
      return this.getCustomerSalesReturns(this.context.customerId, query);
    }

    const { withItems = false, from, to, includeDeleted = false } = query;

    if (from && to && new Date(from) > new Date(to)) {
      throw new Error('Invalid date range: "from" date cannot be after "to" date.');
    }

    const salesReturns = await this.salesReturnRepository.selectAll(query);
    return withItems ? await this.appendSalesReturnItems(salesReturns) : salesReturns;
  }

  // Update Sales Return
  async updateSalesReturn(srId: number, salesReturnData: SalesReturnDto) {
    this.additionalSalesReturnValidation(salesReturnData as ISalesReturn);

    const updatedSalesReturn = await this.salesReturnRepository.withMultipleTransaction(async () => {
      const updatedUserId = this.context.userId;

      // Validate if the sales return exists
      const existingSalesReturn = await this.salesReturnRepository.selectById(srId);
      if (!existingSalesReturn) {
        throw new Error(`Sales return with ID ${srId} not found.`);
      }

      // Update customer's credit balance
      const updatingSalesReturnTotal = existingSalesReturn.total - salesReturnData.total;
      await this.customerService.updateCustomerCreditBalance(existingSalesReturn.customerId, updatingSalesReturnTotal);

      const { items, ...mainFields } = salesReturnData;
      // Delete existing items
      await this.salesReturnItemRepository.deleteSalesReturnItems(srId);
      await this.salesReturnRepository.update(srId, {
        ...mainFields,
        updatedUserId,
      });

      const updatedSalesReturn = await this.getSalesReturnById(srId);
      this.logService.saveImportantLogToFile(
        `sales return updated!! prevRecord ${JSON.stringify(existingSalesReturn)}`,
        'sales-return-updates.log'
      );
      return updatedSalesReturn;
    }, true);

    if (!updatedSalesReturn) {
      throw new BadRequestException('Failed to update sales return.');
    }
    // Log the update of the sales return
    this.logService.updation(srId, ` Sales return updated successfully,  ${Object.keys(salesReturnData).join(', ')}`);
    return updatedSalesReturn;
  }

  // Delete Invoice and Items
  async deleteSalesReturn(srId: number, query: DeleteQueryDto) {
    if (query.forceDelete && this.context.isCustomer()) {
      throw new BadRequestException('Customers cannot force delete sales returns.');
    }

    const salesReturn = await this.salesReturnRepository.selectById(srId);
    if (!salesReturn) {
      throw new BadRequestException(`Sales return with ID ${srId} not found.`);
    }

    await this.salesReturnRepository.withMultipleTransaction(async () => {
      await this.salesReturnItemRepository.deleteSalesReturnItems(srId);
      await this.salesReturnRepository.delete(srId, this.context.userId);
    }, true);

    this.logService.deletion(srId, `Sales return with ID ${srId} deleted successfully.`);
    this.logService.saveImportantLogToFile(
      `sales return deleted!! id: ${srId}, prev record: ${JSON.stringify(salesReturn)}`
    );
    return { success: true, deleted: true, id: srId };
  }

  private additionalSalesReturnValidation(salesReturn: ISalesReturn): boolean {
    if (salesReturn.items.some((item) => item.price < 0 || item.quantity < 0)) {
      throw new BadRequestException('Invalid sales return data: item price and quantity cannot be negative.');
    }

    const itemsTotal = salesReturn.items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
    if (salesReturn.total !== itemsTotal) {
      throw new BadRequestException(
        `Sales return total does not match the total of items. Expected: ${itemsTotal}, Provided: ${salesReturn.total}`
      );
    }

    if (salesReturn.items && salesReturn.items.length === 0) {
      throw new BadRequestException('Invalid sales return data: items cannot be empty.');
    }

    return true;
  }

  private async appendSalesReturnItems(
    salesReturn: ISalesReturn | ISalesReturn[]
  ): Promise<ISalesReturn | ISalesReturn[]> {
    if (Array.isArray(salesReturn)) {
      for (const aSalesReturn of salesReturn) {
        aSalesReturn.items = await this.salesReturnItemRepository.getSalesReturnItems(aSalesReturn.id);
      }
      return salesReturn;
    }
    salesReturn.items = await this.salesReturnItemRepository.getSalesReturnItems(salesReturn.id);
    return salesReturn;
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

CREATE TABLE `sales_return` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`customerId` INT(10) UNSIGNED NOT NULL,
	`returnDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`total` DECIMAL(12,2) NOT NULL DEFAULT '0.00',
	`remarks` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`createdAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	`createdUserId` INT(10) UNSIGNED NOT NULL,
	`updatedAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
	`updatedUserId` INT(10) UNSIGNED NOT NULL,
	`isActive` TINYINT(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `customerId` (`customerId`) USING BTREE,
	CONSTRAINT `sales_return_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
;

CREATE TABLE sales_return_items (
	salesReturnId INT UNSIGNED NOT NULL,
	itemId INT UNSIGNED NOT NULL,
	quantity INT NOT NULL DEFAULT 1,
	price DECIMAL(12,2) NOT NULL,
	FOREIGN KEY (salesReturnId) REFERENCES sales_return(id),
	FOREIGN KEY (itemId) REFERENCES products(id)
);
 */
