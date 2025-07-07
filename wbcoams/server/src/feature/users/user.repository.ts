import { Inject, Injectable } from '@nestjs/common';
import { IUser } from '@SharedRepo/interfaces/user.interface';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { UserPaginationDto } from './dto/user-query.dto';

@Injectable()
export class UserRepository extends BaseRepository<IUser, UserPaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) protected readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'users';
    this.hasCreatedColumns = true;
    this.hasUpdatedColumns = true;
    this.hasSoftDelete = true;
  }

  public async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T> {
    return await this.db.withMultipleTransaction(runInTransaction, isContinueTransaction);
  }

  async selectById(userId: number): Promise<IUser | null> {
    return await this.findById(userId);
  }

  async selectAll(query: UserPaginationDto): Promise<IUser[]> {
    return await this.findAll(query, true);
  }

  async create(userData: Partial<IUser>): Promise<number> {
    return await this.insert(userData);
  }

  async update(userId: number, userData: Partial<IUser>): Promise<boolean> {
    return await this.updateById(userId, userData);
  }

  async delete(userId: number, deletedBy: number): Promise<boolean> {
    return await this.softDelete(userId, deletedBy);
  }

  async selectSingleFeildByUserId<T>(userId: number, fieldName: string): Promise<T | null> {
    return await super.selectSingleFeildById(userId, fieldName);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await super.findOneByField('email', email);
    return user;
  }
}
