import { OrderStatus } from "@SharedRepo/enums/order-status-roles.enum";
import { IBaseEntity } from "./base-entity.interface";
import { IOrderItem } from "./order-items.interface";

export interface IOrder extends IBaseEntity {
    customerId: number;
    orderDate?: Date;
    total:number;
    status?: OrderStatus;
    remarks?: string;
    items: IOrderItem[];
}