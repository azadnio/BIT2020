export interface IDatabaseService {
  query<T = any>(sql: string, params?: any[]): Promise<T>;
  execute(sql: string, params?: any[]): Promise<any>;
  withMultipleTransaction<T>(runInTransaction: () => Promise<T>, isContinueTransaction: boolean): Promise<T>;
}
