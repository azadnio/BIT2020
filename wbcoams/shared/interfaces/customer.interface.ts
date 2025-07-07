import { IUser } from './user.interface';
export interface ICustomer extends IUser {
  creditLimit: number;
  creditBalance?: number;
  userId?: number;
}
