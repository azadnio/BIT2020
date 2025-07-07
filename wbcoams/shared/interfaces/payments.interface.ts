import { PaymentTypes } from "../enums/payment-types.enum";
import { IBaseEntity } from "./base-entity.interface";

export interface IPayment extends IBaseEntity {
    invoiceId?: number;
    paymentDate: Date;
    cash?: number; // Amount paid in cash
    bankTransfer?: number; // Amount paid via bank transfer
    cheque?: number; // Amount paid via cheque
    paymentType: PaymentTypes;
    chequeId?: number; // Optional, only if paymentType is 'cheque'
    remarks?: string;
}