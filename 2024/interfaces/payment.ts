import { EEntityStatus } from '../enums/entity-status';
import IBase from './base';
import IOrderItem from './order-item';

export default interface IPayment extends IBase {
  CustId: number;
  Date: Date;
  Cash: number;
  Remark: Text;
  Type: number;
  Status: EEntityStatus;
  Items: IOrderItem[];
}
