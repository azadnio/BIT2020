import { IBaseEntity } from './base-entity.interface';
import { ChequeStatus } from '../enums/cheque-status.enum';

export interface ICheque extends IBaseEntity {
    chequeNumber: string;
    status: ChequeStatus;
    amount: number;
    customerId: number;
    bankName: string;
    bankBranch: string;
    accountNumber: string;
    chequeDate: Date;
    remarks?: string;
}