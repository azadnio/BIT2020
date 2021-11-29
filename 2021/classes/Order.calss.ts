import { Entity } from "./base.class";
import { OrderItem } from "./OrderItem.calss";

export class Order extends Entity {

    CustId: number
    InoviceDate: Date
    Discount: number
    Remark: string
    Items: OrderItem[]
}