import { CustomerAccountTransactionTypes } from "../enums/customer-account-transaction-types.enum";

export interface CustomerAccountTransaction {
    id?: number;
    customerId: number;
    linkedEntryId: number;
    amount: number;
    transactionDate: Date;
    transactionType: CustomerAccountTransactionTypes;
    description?: string;
    createdAt?: Date;
}
