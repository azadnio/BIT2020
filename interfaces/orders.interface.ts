export interface IOrder {

    id: number
    date: string
    customer: number
}

let LIST: IOrder[] = [];



export interface IOrderDashboard {

    id: number
    date: string
    customer: string
    amount: number
    status: number
    invoiceNo: number
    comments: string

}

let LIST2: IOrderDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST2.push({
        id: index,
        customer: 'customer ' + index,
        date: index + '/10/2020',
        amount: 10 * index,
        status: index % 3,
        invoiceNo: index * 100 + 1,
        comments: 'this is a comment' + index        
    });

export const DASHBORAD_ORDER_LIST = LIST2;
