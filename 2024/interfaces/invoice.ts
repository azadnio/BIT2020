import { EEntityStatus } from '../enums/entity-status';
import IBase from './base';
import IInvoiceItem from './invoice-item';

export default interface IInvoice extends IBase {
  CustId: number;
  Date: Date;
  Discount: number;
  Remark: Text;
  Status: EEntityStatus;
  Items: IInvoiceItem[];
}
