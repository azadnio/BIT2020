export interface ICustomer {

    id: number
    name: string
    city: string
    phone: string
    nic: string
    creditLimit: number
    image: string
    password?: string;
    email: string
    status?: number
    address?: string
}

let LIST: ICustomer[] = [];

for (let index = 1; index <= 10; index++)
    LIST.push({
        id: index,
        name: 'customer ' + index,
        city: 'city ' + index,
        phone: 'oooo' + index,
        nic: '1234' + index,
        creditLimit: index * 1000,
        image: '',
        email: 'email'
    });

export const CUSTOMER_LIST = LIST;


export interface ICustomerDashboard {

    Id: number
    Name: string
    City: string
    Mobile: string
    Telephone: string
    PedingChaeques: number
    PaymentBalance: number
    Status: number,
    LastPayment: Date;
    Address: string;
    Email: string;
    NIC: string;
    CreditLimit: number
    CreatedAt: Date,
    Modified: Date,
    CreatedBy: string;
    ModifiedBy: string;
}

let LIST2: ICustomerDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST2.push({
        Id: index,
        Name: 'customer ' + index,
        City: 'city ' + index,
        Mobile: '077123445' + index,
        PedingChaeques: index * 1000,
        PaymentBalance: index * 100,
        Status: index % 3,
        LastPayment: new Date(),
        Address: 'this is a address',
        Email: 'Email',
        NIC: '11'+ index,
        CreditLimit: index * 1000,
        CreatedAt: new Date(),
        Modified: new Date(),
        CreatedBy: 'azad',
        ModifiedBy: 'azad new',
        Telephone: '0112123445' + index
    });

export const DASHBORAD_CUSTOMER_LIST = LIST2;


export interface IPaymentsDashboard {

    id: number
    date: Date,
    customer: string
    paymentType: number
    addedBy: string
    comment: string,
    custId: number
}

let LIST3: IPaymentsDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST3.push({
        id: index,
        date: new Date(),
        customer: 'customer ' + index,
        custId: index,
        paymentType: 1,
        addedBy: 'addedby ' + 1,
        comment: 'this is a comment'
    });

export const DASHBORAD_PAYMENTS_LIST = LIST3;