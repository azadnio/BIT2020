import { Customer } from './user.model';

export interface Payment {
  id: number;
  custId: number;
  paymentDate: string;
  cash?: number;
  type:
    | 'cash'
    | 'cheque'
    | 'bank_transfer'
    | 'cash_and_cheque'
    | 'cash_and_bank_transfer';
  remarks?: string;
  createdUserId: number;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  cheques?: Cheque[];
}

export interface Cheque {
  id: number;
  chequeNumber: string;
  status: 'pending' | 'passed' | 'returned';
  amount: number;
  customerId: number;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  chequeDate: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}
