import { Injectable, BadRequestException } from '@nestjs/common';
import { ICustomer } from '@SharedRepo/interfaces/customer.interface';
import { IUser } from '@SharedRepo/interfaces/user.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
// import { UsersService } from 'src/users/users.service';
import { UsersService } from 'src/feature/users/users.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateUserDto } from 'src/feature/users/dto/create-user.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import { CustomerRepository } from './customer.repository';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { LogService } from 'src/core/log/log.service';

@Injectable()
export class CustomersService {
  constructor(
    private readonly userService: UsersService,
    private readonly customerRepository: CustomerRepository,
    private readonly context: RequestContextService,
    private readonly logService: LogService
  ) {}

  async createCustomer(customer: CreateCustomerDto, photo: Express.Multer.File): Promise<ICustomer> {
    const { creditLimit = 100_000, ...userData } = customer;

    userData.role = UserRole.CUSTOMER;

    return await this.customerRepository.withMultipleTransaction(async () => {
      const { id } = await this.userService.createUser(userData as CreateUserDto, photo, true, true);
      const customerId = await this.customerRepository.create({
        userId: id,
        creditLimit,
      } as ICustomer);
      return await this.customerRepository.selectById(customerId);
    }, true);
  }

  async getCustomers(query: PaginationDto): Promise<ICustomer[]> {
    if (query.includeDeleted && this.context.user.role === UserRole.STAFF) {
      throw new Error('Staff users cannot access deleted customers.');
    }
    return await this.customerRepository.selectAll(query);
  }

  async getCustomerById(id: number): Promise<ICustomer | null> {
    const customer = await this.customerRepository.selectById(id);
    if (!customer) {
      throw new BadRequestException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }

  async getCustomerByUserId(userId: number): Promise<ICustomer | null> {
    return await this.customerRepository.selectByUserId(userId);
  }

  async updateCustomer(
    customerId: number,
    customerData: UpdateCustomerDto,
    skipReturn: boolean,
    photo?: Express.Multer.File
  ): Promise<ICustomer> {
    //extract customer specific fields and user fields
    const { creditLimit, creditBalance, userId, ...userData } = customerData as ICustomer;

    // validation checks
    if (Object.keys(userData).length === 0 && creditLimit === undefined && !photo) {
      throw new BadRequestException('No valid fields provided for update.');
    }
    if (creditBalance !== undefined) {
      throw new BadRequestException('Credit balance cannot be updated directly.');
    }
    if (userId) {
      throw new BadRequestException('User ID cannot be updated directly.');
    }

    const result = await this.customerRepository.withMultipleTransaction(async () => {
      const userId = await this.customerRepository.getUserId(customerId);
      if (!userId) {
        throw new BadRequestException(`Customer with ID ${customerId} not found.`);
      }
      // Update user information
      if (Object.keys(userData).length > 0 || photo) {
        userData.updatedUserId = this.context.user.id;
        await this.userService.updateUser(userId, userData as IUser, photo, true, true);
      }
      // Update customer information
      if (creditLimit !== undefined) {
        await this.customerRepository.update(customerId, {
          creditLimit,
        } as ICustomer);
      }

      return skipReturn ? null : await this.customerRepository.selectById(customerId);
    }, true);

    this.logService.updation(customerId, `Customer updated: ${Object.keys(customerData).join(', ')}`);
    return result;
  }

  async deleteCustomer(id: number) {
    const userId = await this.customerRepository.getUserId(id);
    if (!userId) {
      throw new BadRequestException(`Customer with ID ${id} not found.`);
    }
    await this.userService.deleteUser(userId, this.context.userId);
    this.logService.deletion(id, `Customer with ID ${id} deleted.`);
  }

  async getUserIdByCustomerId(customerId: number): Promise<number | null> {
    return await this.customerRepository.getUserId(customerId);
  }

  async getCustomerCreditInfo(id: number): Promise<{ creditLimit: number; creditBalance: number }> {
    return await this.customerRepository.selectCustomerCreditInfo(id);
  }

  async updateCustomerCreditBalance(customerId: number, newCreditBalance: number): Promise<void> {
    if (newCreditBalance === undefined || newCreditBalance === null) {
      throw new BadRequestException('New credit balance must be provided.');
    }

    const result = await this.customerRepository.updateCustomerCreditBalance(customerId, newCreditBalance);
    if (result) {
      this.logService.other(
        customerId,
        'updateCreditBalance',
        `Credit balance updated to ${newCreditBalance} for customer ID ${customerId}.`
      );
    }
  }
}

/**
 * CREATE TABLE `customers` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` INT(10) UNSIGNED NOT NULL,
  `creditLimit` DECIMAL(12,2) NOT NULL DEFAULT '100000.00',
  `creditBalance` DECIMAL(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `userId` (`userId`) USING BTREE,
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)

CREATE TABLE `users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `email` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `telephone` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `address` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `address2` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `city` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `nic` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `mobile` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `photo` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `role` ENUM('admin','staff','customer','manager') NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
  `isActive` TINYINT(1) NOT NULL DEFAULT '1',
  `createdAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
  `createdUserId` INT(10) UNSIGNED NOT NULL,
  `updatedAt` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP' ON UPDATE CURRENT_TIMESTAMP,
  `updatedUserId` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email` (`email`) USING BTREE,
  INDEX `idx_email` (`email`) USING BTREE,
  INDEX `idx_nic` (`nic`) USING BTREE,
  INDEX `idx_mobile` (`mobile`) USING BTREE
)
 */
