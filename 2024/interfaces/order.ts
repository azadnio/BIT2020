import { EEntityStatus } from '../enums/entity-status';
import IBase from './base';
import IOrderItem from './order-item';

export default interface IOrder extends IBase {
  CustId: number;
  Date: Date;
  Remark: Text;
  Status: EEntityStatus;
  Items: IOrderItem[];
}
