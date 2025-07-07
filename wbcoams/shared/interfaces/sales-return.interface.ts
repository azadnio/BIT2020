import { IBaseEntity } from './base-entity.interface';
import { ISalesReturnItem } from './sales-return-tems.interface';
export interface ISalesReturn extends IBaseEntity {
    customerId: number;
    returnDate?: Date;
    total?: number;
    remarks?: string;
    items: ISalesReturnItem[];
}