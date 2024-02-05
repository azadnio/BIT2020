import { EEntityStatus } from '../../enums/entity-status';
import IBase from '../base';

export default interface IUser extends IBase {
  Name: string;
  Email: string;
  Password: string;
  Address: string;
  Mobile: string;
  Status: EEntityStatus;
  Photo: string;
}
