export interface IDashboardCheque {

    id: number
    number: string
    date: Date
    amount: number
    customer: string
    status: number
    paymentId: number
    comments: string
    custId:number,
    bank: string
}

let LIST: IDashboardCheque[] = [];

for (let index = 1; index <= 10; index++)
    LIST.push({
        id: index,
        number: '00010' + index,
        date: new Date(),
        amount: index * 100,
        customer: 'Customer ' + index,
        custId: index,
        status: index % 2,
        paymentId: index,
        comments: 'this is a comment ' + index,
        bank: 'BOC'
    });


export const DASHBORAD_CHEQUE_LIST = LIST;
