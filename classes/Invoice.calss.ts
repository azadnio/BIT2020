import { InvoiceItem } from './InvoiceItem.calss';
import { Entity } from "./base.class";

export class Invoice extends Entity {

    CustId: number
    InoviceDate: Date
    Discount: number
    Remark: string
    Items: InvoiceItem[]
}