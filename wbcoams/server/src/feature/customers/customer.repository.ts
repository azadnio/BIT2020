import { Inject, Injectable } from '@nestjs/common';
import { ICustomer } from '@SharedRepo/interfaces/customer.interface';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { UserPaginationDto } from '../users/dto/user-query.dto';
// import { UserPaginationDto } from "src/users/dto/user-query.dto";

@Injectable()
export class CustomerRepository extends BaseRepository<ICustomer, UserPaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) public readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'customers';
    this.hasCreatedColumns = false;
    this.hasUpdatedColumns = false;
    this.hasSoftDelete = false;
  }

  override get genericSelectQuery(): string {
    let selectionSql = `
            SELECT 
                u.*,
                ${this.tableName}.*,
                cu.name AS createdUser,
                uu.name AS updatedUser
            FROM ${this.tableName}
            INNER JOIN users AS u ON ${this.tableName}.userId = u.id
            LEFT JOIN users AS cu ON u.createdUserId = cu.id
            LEFT JOIN users AS uu ON u.updatedUserId = uu.id`;
    return selectionSql;
  }

  public async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T> {
    return await this.db.withMultipleTransaction(runInTransaction, isContinueTransaction);
  }

  async selectById(id: number): Promise<ICustomer | null> {
    return await this.findById(id);
  }

  async getUserId(customerId: number): Promise<number | null> {
    return await this.selectSingleFeildById<number>(customerId, 'userId');
  }

  async selectByUserId(userId: number): Promise<ICustomer | null> {
    return await this.findOneByField('userId', userId);
  }

  async selectCustomerCreditInfo(customerId: number): Promise<{ creditLimit: number; creditBalance: number }> {
    const sql = `
            SELECT creditLimit, creditBalance
            FROM customers
            WHERE id = ?`;
    const [row] = await this.db.query<any[]>(sql, [customerId]);
    return row && row.length > 0
      ? (row[0] as { creditLimit: number; creditBalance: number })
      : { creditLimit: 0, creditBalance: 0 };
  }

  async updateCustomerCreditBalance(customerId: number, newCreditBalance: number): Promise<boolean> {
    let setValueStr = 'creditBalance + ?';
    if (newCreditBalance < 0) {
      setValueStr = 'creditBalance - ?';
    }
    newCreditBalance = Math.abs(newCreditBalance);

    const [result] = await this.db.execute(
      `UPDATE customers 
         SET creditBalance = ${setValueStr} 
         WHERE id = ?`,
      [newCreditBalance, customerId]
    );
    return result.affectedRows > 0;
  }

  async selectAll(query: UserPaginationDto): Promise<ICustomer[]> {
    return await this.findAll(query, true);
  }

  async create(customerData: ICustomer): Promise<number> {
    return await this.insert(customerData);
  }

  async update(id: number, customerData: ICustomer): Promise<boolean> {
    return await this.updateById(id, customerData);
  }

  async delete(id: number, deletedBy: number): Promise<boolean> {
    return await this.softDelete(id, deletedBy);
  }
}
