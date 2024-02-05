import IUser from './user';

export default interface ISystemUser extends IUser {
  Role: number;
}
