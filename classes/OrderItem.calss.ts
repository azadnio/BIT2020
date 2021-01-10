import { Entity } from "./base.class";

export class OrderItem extends Entity {

    OrderId: number;
    ItemId: number;
    Price: number;
    Qty:number;
}