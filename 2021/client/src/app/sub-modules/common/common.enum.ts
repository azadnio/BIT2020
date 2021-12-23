export enum ChequeStatus {
    pending = 0,
    returned = 1,
    passed = 2
}

export enum Status {
    deleted = 0,
    active = 1
}

export enum PaymentStatus {
    pending = 0,
    paid = 1
}

export enum PaymentType {
    cheque = 0,
    cash = 1,
    cashAndCheque = 2
}

export enum OrderStatus {
    new = 0,
    processing = 1,
    withHold = 2,
    deleverd = 3,
    canceled = 4
}

export enum ViewSource {
    router,
    modal
}

export enum TransactionType {
    credit,
    debit
}

export enum ItemUnit {
    Nos,
    Kg,
    Ltr,
    Pkt,
    Box,
    Dozn,
    Barrel,
    Pcs,
    Feet,
    Roll
}