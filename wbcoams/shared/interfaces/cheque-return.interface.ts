import { ChequeReturnReason } from "../enums/cheque-return-reason";

export interface IChequeReturn  {
    paymentId: number;
    returnDate: Date;
    reason: ChequeReturnReason;
    remarks?: string;
    chequeId: number;
}
