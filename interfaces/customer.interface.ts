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

    id: number
    name: string
    city: string
    phone: string
    pedingChaeques: number
    paymentBalance: number
    status: number,
    lastPayment: Date;
}

let LIST2: ICustomerDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST2.push({
        id: index,
        name: 'customer ' + index,
        city: 'city ' + index,
        phone: '077123445' + index,
        pedingChaeques: index * 1000,
        paymentBalance: index * 100,
        status: index % 3,
        lastPayment: new Date()
    });

export const DASHBORAD_CUSTOMER_LIST = LIST2;


export interface IPaymentsDashboard {

    id: number
    date: string
    customer: string
    paymentType: number
    addedBy: string
    comment: string
}

let LIST3: IPaymentsDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST3.push({
        id: index,
        date: index + '/12/2020',
        customer: 'customer ' + index,
        paymentType: 1,
        addedBy: 'addedby ' + 1,
        comment: 'this is a comment'
    });

export const DASHBORAD_PAYMENTS_LIST = LIST3;