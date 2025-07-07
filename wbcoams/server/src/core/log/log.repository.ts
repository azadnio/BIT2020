import { Inject, Injectable } from '@nestjs/common';
import { ILog } from '@SharedRepo/interfaces/log.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { LogPaginationDto } from './dto/lg-pagination.dto';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';

@Injectable()
export class LogRepository extends BaseRepository<ILog, LogPaginationDto> {
  protected tableName: string;
  protected hasCreatedColumns: boolean;
  protected hasUpdatedColumns: boolean;
  protected hasSoftDelete: boolean;

  constructor(@Inject(DATABASE_SERVICE) public readonly db: IDatabaseService) {
    super(db);
    this.tableName = 'logs';
    this.hasCreatedColumns = true;
    this.hasUpdatedColumns = false;
    this.hasSoftDelete = false;
  }

  public async create(entity: Partial<ILog>): Promise<number> {
    return await this.insert(entity);
  }

  public async selectAll(queryParams: IPagination): Promise<ILog[]> {
    return await this.findAll(queryParams, true);
  }

  public async selectUserLogs(userId: number, queryParams: LogPaginationDto): Promise<ILog[]> {
    const { limit, page } = queryParams as IPagination;
    const offset = (page - 1) * limit;

    const { values, setClause } = this.generateFilterQueryStrings(queryParams);
    values.unshift(userId); // Add userId to the beginning of the values array
    const sql = `
            SELECT * FROM ${this.tableName}
            WHERE userId = ? ${setClause ? ` AND ${setClause}` : ''}
            LIMIT ? OFFSET ?
            ORDER BY timestamp DESC
        `;
    return await this.db.query<ILog[]>(sql, [...values, limit, offset]);
  }

  public async withMultipleTransaction<T>(_: () => Promise<T>, __: boolean): Promise<T> {
    throw new Error('cannot run transaction for log repository');
  }

  public async selectById(_: number): Promise<ILog> {
    throw new Error('cannot select log by id');
  }

  public async update(_: number, __: Partial<ILog>): Promise<boolean> {
    throw new Error('cannot update log');
  }

  public async delete(_: number, __: number): Promise<boolean> {
    throw new Error('cannot delete log');
  }
}
