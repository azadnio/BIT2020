/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException } from '@nestjs/common';
import { IDatabaseService } from '../interfaces/database.service.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';

export abstract class BaseRepository<T, K = Record<string, unknown>> {
  protected abstract tableName: string;
  protected abstract hasCreatedColumns: boolean;
  protected abstract hasUpdatedColumns: boolean;
  protected abstract hasSoftDelete: boolean;

  constructor(protected readonly db: IDatabaseService) {}

  protected abstract selectById(id: number): Promise<T | null>;
  protected abstract selectAll(queryParams: IPagination): Promise<T[]>;
  protected abstract create(entity: Partial<T>): Promise<number>;
  protected abstract update(id: number, entity: Partial<T>): Promise<boolean>;
  protected abstract delete(id: number, deletedBy: number): Promise<boolean>;
  protected abstract withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T>;

  protected get genericSelectQuery(): string {
    const selectionSql = `
      SELECT 
        ${this.tableName}.* 
        ${this.hasCreatedColumns ? ', createdUser.name AS createdUser' : ''}
        ${this.hasUpdatedColumns ? ', updatedUser.name AS updatedUser' : ''}
        FROM ${this.tableName}
        ${this.hasCreatedColumns ? `LEFT JOIN users AS createdUser ON ${this.tableName}.createdUserId = createdUser.id` : ''}
        ${this.hasUpdatedColumns ? `LEFT JOIN users AS updatedUser ON ${this.tableName}.updatedUserId = updatedUser.id` : ''}`;
    return selectionSql;
  }

  protected async findById(id: number): Promise<T | null> {
    let sql = this.genericSelectQuery;
    sql += ` WHERE ${this.tableName}.id = ?`;
    const [row] = await this.db.query<any[]>(sql, [id]);
    return row ? (row as T) : null; // Assuming the row is already in the correct format
  }

  // protected async findAll<T = Record<string, unknown>>(filter?: T & Partial<IPagination>): Promise<T[]> {
  protected async findAll(
    queryParams?: K & Partial<IPagination>,
    sortById = true,
    descendingOrder = false
  ): Promise<T[]> {
    // Construct the SQL query based on the repository's properties

    const { limit, page } = queryParams as IPagination;
    const offset = (page - 1) * limit;
    const { setClause, values } = this.generateFilterQueryStrings(queryParams);

    const sql = `
      ${this.genericSelectQuery}
      ${setClause ? ` WHERE ${setClause}` : ''}
      ${sortById ? ` ORDER BY ${this.tableName}.id ${descendingOrder ? 'DESC' : 'ASC'}` : ''}
      LIMIT ? OFFSET ?
    `.trim();

    const rows = await this.db.query<any[]>(sql, [...values, limit, offset]);
    return Array.isArray(rows) ? (rows as T[]) : [];
  }

  protected async insert(entity: Partial<T>): Promise<number> {
    const { setClause, values } = this.generateUpdateSETKeyValueString(entity);
    const sql = `INSERT INTO ${this.tableName} SET ${setClause}`;

    const result = await this.db.execute(sql, values);
    return result.insertId;
  }

  protected async updateById(id: number, entity: Partial<T>): Promise<boolean> {
    const { setClause, values } = this.generateUpdateSETKeyValueString(entity);
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;

    const result = await this.db.execute(sql, [...values, id]);

    if (result.affectedRows === 0) {
      throw new BadRequestException(`No record found with ID ${id} to update.`);
    }
    return result.affectedRows > 0;
  }

  protected async deletePermanently(id: number): Promise<boolean> {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  protected async softDelete(id: number, deletedBy: number): Promise<boolean> {
    const sql = `UPDATE ${this.tableName} SET isActive = 0, updatedUserId = ? WHERE id = ?`;
    const result = await this.db.execute(sql, [deletedBy, id]);
    return result.affectedRows > 0;
  }

  protected async restore(id: number): Promise<boolean> {
    const sql = `UPDATE ${this.tableName} SET isActive = 1 WHERE id = ?`;
    const result = await this.db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  protected async count(): Promise<number> {
    const sql = `SELECT COUNT(*) as count FROM ${this.tableName}`;
    const [row] = await this.db.query<{ count: number }[]>(sql);
    return row ? row[0].count : 0;
  }

  protected async exists(id: number): Promise<boolean> {
    const sql = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE id = ?`;
    const [row] = await this.db.query<{ count: number }[]>(sql, [id]);
    return row ? row[0].count > 0 : false;
  }

  protected async findOneByField(field: string, value: any): Promise<T | null> {
    const sql = `SELECT * FROM ${this.tableName} WHERE ${field} = ?`;
    const [row] = await this.db.query<any[]>(sql, [value]);
    return row ? (row as T) : null;
  }

  protected async isExistsById(id: number): Promise<boolean> {
    const sql = `SELECT 1 FROM ${this.tableName} WHERE id = ? LIMIT 1`;
    const [row] = await this.db.query<any[]>(sql, [id]);
    return !!row;
  }

  protected async selectSingleFeildById<M>(id: number, field: string): Promise<M | null> {
    const sql = `SELECT ${field} FROM ${this.tableName} WHERE id = ?`;
    const [row] = await this.db.query<any[]>(sql, [id]);

    if (Array.isArray(row) && row.length > 0) {
      return row[0][field] as M; // Assuming the field exists in the row
    } else if (row && typeof row === 'object' && field in row) {
      return row[field] as M; // If row is an object and field exists
    }
  }

  protected async selectSingleEntitySelectedFireldById<M>(
    id: number,
    fields: string[]
  ): Promise<{ [key: string]: keyof T } | null> {
    const fieldList = fields.join(', ');
    const sql = `SELECT ${fieldList} FROM ${this.tableName} WHERE id = ?`;
    const [row] = await this.db.query<any[]>(sql, [id]);
    return row && row.length > 0 ? (row[0] as { [key: string]: keyof T }) : null;
  }

  protected generateFilterQueryStrings(filter: object = {}): {
    setClause: string;
    values: any[];
  } {
    const { from, to, includeDeleted = false, page, limit, ...rest } = filter as IPagination;
    const conditions: string[] = [];
    const values: any[] = [];

    if (from) {
      conditions.push(`${this.tableName}.createdAt >= ?`);
      values.push(from);
    }
    if (to) {
      conditions.push(`${this.tableName}.createdAt <= ?`);
      values.push(to);
    }

    if (this.hasSoftDelete && !includeDeleted) {
      conditions.push(`${this.tableName}.isActive = 1`);
    }

    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined && value !== null) {
        conditions.push(`${this.tableName}.${key} = ?`);
        values.push(value);
      }
    }

    const setClause = conditions.length > 0 ? ` ${conditions.join(' AND ')}` : '';

    return {
      setClause,
      values,
    };
  }
  // Generic function to build SET clause and values for SQL UPDATE
  // returns an object with setClause and values
  // ?,?,?
  protected generateUpdateSETKeyValueString(entity: Partial<T>): {
    setClause: string;
    values: any[];
  } {
    const keys = Object.keys(entity);
    const setClause = keys.map((key) => `${key} = ?`).join(', ');
    const values = Object.values(entity);
    return { setClause, values };
  }
}
