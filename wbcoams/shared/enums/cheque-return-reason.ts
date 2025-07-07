export enum ChequeReturnReason {
    INSUFFICIENT_FUNDS = 'insufficient_funds',
    ACCOUNT_CLOSED = 'account_closed',
    STOP_PAYMENT = 'stop_payment',
    ALTERED = 'altered',
    MISMATCHED_SIGNATURE = 'mismatched_signature',
    OTHER = 'other',
}