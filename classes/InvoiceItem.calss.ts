import { Base } from "./base.class";

export class InvoiceItem extends Base {

    ItemId: number;
    InvoiceId: number;
    Price: number;
    Quantity: number;
}