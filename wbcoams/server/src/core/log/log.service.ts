import { Injectable } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { RequestContextService } from 'src/core/auth/request-context.service';
import { ILog } from '@SharedRepo/interfaces/log.interface';
import { UserRole } from '@SharedRepo/enums/user-roles.enum';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LogService {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly context: RequestContextService
  ) {}

  public async select(query: any): Promise<ILog[]> {
    if ([UserRole.CUSTOMER, UserRole.STAFF].includes(this.context.userRole)) {
      return await this.logRepository.selectUserLogs(this.context.userId, query);
    }
    return await this.logRepository.selectAll(query);
  }

  public async selectUserLogs(userId: number, query: any): Promise<ILog[]> {
    return await this.logRepository.selectUserLogs(userId, query);
  }

  public async updation(targetId: number, description: string): Promise<void> {
    await this.log(targetId, 'update', description || ' -- updated the record -- ');
  }

  public async creation(targetId: number, description: string): Promise<void> {
    await this.log(targetId, 'create', description || ' -- created a new record -- ');
  }

  public async deletion(targetId: number, description: string): Promise<void> {
    await this.log(targetId, 'delete', description || ' -- deleted the record -- ');
  }

  public async other(targetId: number, action: string, description: string): Promise<void> {
    await this.log(targetId, action, description || ' -- other action -- ');
  }

  /**
   * Save important logs to a text file in the logs directory.
   * @param message The log message to save.
   * @param filename Optional filename (default: 'important.log')
   */
  public async saveImportantLogToFile(message: string, filenamePrefix = 'important-log'): Promise<void> {
    const logsDir = path.resolve(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${filenamePrefix}-${timestamp}.log`;
    const logPath = path.join('logs', filename);
    const logEntry = `[${new Date().toISOString()}] \n ${message}\n`;
    fs.writeFileSync(logPath, logEntry, { encoding: 'utf8' });
  }

  private async log(targetId: number, action: string, description: string): Promise<void> {
    const logEntry = {
      userId: this.context.user.id,
      action,
      description,
      targetId,
      timestamp: new Date(),
    };
    await this.logRepository.create(logEntry as ILog);
  }
}
