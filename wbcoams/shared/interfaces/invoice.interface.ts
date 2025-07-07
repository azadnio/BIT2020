import { IBaseEntity } from './base-entity.interface';
import { IInvoiceItem } from './invoice-items.interface';

export interface IInvoice extends IBaseEntity {
    customerId: number;
    invoiceDate?: Date;
    subTotal?: number;
    discount?: number;
    total?: number;
    dueDate?: Date;
    remarks?: string;
    status?: 'draft' | 'finalized' | 'paid' | 'cancelled';
    items: IInvoiceItem[];
}
