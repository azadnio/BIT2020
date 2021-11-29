export interface IOrder {

    id: number
    date: string
    customer: number
}

let LIST: IOrder[] = [];



export interface IOrderDashboard {

    id: number
    date:  Date,
    customer: string
    amount: number
    status: number
    invoiceNo: number
    comments: string
    customerId: number
}

let LIST2: IOrderDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST2.push({
        id: index,
        customer: 'customer ' + index,
        date: new Date(),
        amount: 10 * index,
        customerId: index,
        status: index % 3,
        invoiceNo: index * 100 + 1,
        comments: 'this is a comment' + index        
    });

export const DASHBORAD_ORDER_LIST = LIST2;
