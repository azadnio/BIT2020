import IUser from './users/user';

export default interface ICustomer extends IUser {
  Telephone: string;
  City: string;
  NIC: string;
  CreditLimit: number;
}
