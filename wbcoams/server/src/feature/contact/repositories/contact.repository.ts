import { Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/abstract/base-repostory.class';
import { DATABASE_SERVICE } from 'src/common/constants/database.constant';
import { IDatabaseService } from 'src/common/interfaces/database.service.interface';
import { IPagination } from '@SharedRepo/interfaces/pagination.interface';
import { ContactMessage } from '@SharedRepo/interfaces/contact.interface';

@Injectable()
export class ContactRepository extends BaseRepository<any, any> {
  protected tableName: string = 'contact_messages';
  protected hasCreatedColumns: boolean = true;
  protected hasUpdatedColumns: boolean = false;
  protected hasSoftDelete: boolean = false;

  constructor(
    @Inject(DATABASE_SERVICE)
    protected readonly db: IDatabaseService,
  ) {
    super(db);
  }

  // Base repository abstract methods (required but not used)
  protected async selectById(id: number): Promise<any> {
    return this.getMessageById(id);
  }

  protected async selectAll(queryParams: IPagination): Promise<any[]> {
    const result = await this.getAllMessages(queryParams.page, queryParams.limit);
    return result.messages;
  }

  protected async create(entity: Partial<any>): Promise<number> {
    const message = await this.createMessage(entity as Omit<ContactMessage, 'id' | 'createdAt'>);
    return message.id!;
  }

  protected async update(id: number, entity: Partial<any>): Promise<boolean> {
    const result = await this.addResponse(id, entity.response);
    return result !== null;
  }

  protected async delete(id: number, deletedBy: number): Promise<boolean> {
    throw new Error('Delete not implemented for contact messages');
  }

  protected async withMultipleTransaction<T>(
    runInTransaction: () => Promise<T>,
    isContinueTransaction: boolean
  ): Promise<T> {
    return await this.db.withMultipleTransaction(runInTransaction, isContinueTransaction);
  }

  // Contact-specific methods
  async createMessage(messageData: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
    const sql = `
      INSERT INTO contact_messages (name, email, subject, message, created_at, is_read)
      VALUES (?, ?, ?, ?, NOW(), 0)
    `;
    
    const values = [
      messageData.name,
      messageData.email,
      messageData.subject,
      messageData.message
    ];

    try {
      const insertId = await this.db.query<number>(sql, values);
      return this.getMessageById(insertId as any) as Promise<ContactMessage>;
    } catch (error) {
      throw new Error('Failed to save contact message');
    }
  }

  async getAllMessages(page: number = 1, limit: number = 20, isRead?: boolean): Promise<{ messages: ContactMessage[], total: number }> {
    const offset = (page - 1) * limit;
    let whereClause = '';
    let values: any[] = [limit, offset];

    if (isRead !== undefined) {
      whereClause = 'WHERE is_read = ?';
      values = [isRead ? 1 : 0, limit, offset];
    }

    const countSql = `SELECT COUNT(*) as total FROM contact_messages ${whereClause}`;
    const messagesSql = `
      SELECT id, name, email, subject, message, created_at, is_read, response, responded_at
      FROM contact_messages 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;

    try {
      const countResult = await this.db.query<any[]>(countSql, isRead !== undefined ? [isRead ? 1 : 0] : []);
      const messagesResult = await this.db.query<any[]>(messagesSql, values);

      return {
        messages: messagesResult.map(row => this.mapRowToContactMessage(row)),
        total: countResult[0].total
      };
    } catch (error) {
      throw new Error('Failed to fetch contact messages');
    }
  }

  async getMessageById(id: number): Promise<ContactMessage | null> {
    const sql = `
      SELECT id, name, email, subject, message, created_at, is_read, response, responded_at
      FROM contact_messages 
      WHERE id = ?
    `;

    try {
      const result = await this.db.query<any[]>(sql, [id]);
      return result.length > 0 ? this.mapRowToContactMessage(result[0]) : null;
    } catch (error) {
      throw new Error('Failed to fetch contact message');
    }
  }

  async markAsRead(id: number): Promise<ContactMessage | null> {
    const sql = `
      UPDATE contact_messages 
      SET is_read = 1 
      WHERE id = ?
    `;

    try {
      await this.db.query(sql, [id]);
      return this.getMessageById(id);
    } catch (error) {
      throw new Error('Failed to mark message as read');
    }
  }

  async addResponse(id: number, response: string): Promise<ContactMessage | null> {
    const sql = `
      UPDATE contact_messages 
      SET response = ?, responded_at = NOW(), is_read = 1 
      WHERE id = ?
    `;

    try {
      await this.db.query(sql, [response, id]);
      return this.getMessageById(id);
    } catch (error) {
      throw new Error('Failed to add response to message');
    }
  }

  private mapRowToContactMessage(row: any): ContactMessage {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      message: row.message,
      createdAt: row.created_at,
      isRead: Boolean(row.is_read),
      response: row.response,
      respondedAt: row.responded_at
    };
  }
}
