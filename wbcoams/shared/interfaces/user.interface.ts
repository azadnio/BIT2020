import { IBaseEntity } from './base-entity.interface';
import { UserRole } from '../enums/user-roles.enum';

export interface IUser extends IBaseEntity {
  name: string;
  email: string;
  telephone?: string;
  address: string;
  address2?: string;
  city: string;
  nic: string;
  mobile: string;
  photo?: string;
  role?: UserRole;
  password?: string;
}
