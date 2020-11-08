export enum ChequeStatus {
    pending = 0,
    returned = 1
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