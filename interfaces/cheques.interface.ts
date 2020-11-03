export interface IDashboardCheque {

    id: number
    number: string
    date: string
    amount: number
    customer: string
    status: number
    paymentId: number
    comments: string
}

let LIST: IDashboardCheque[] = [];

for (let index = 1; index <= 10; index++)
    LIST.push({
        id: index,
        number: '00010' + index,
        date: index + '/12/2020',
        amount: index * 100,
        customer: 'Customer ' + index,
        status: index % 2,
        paymentId: index,
        comments: 'this is a comment ' + index
        
    });


export const DASHBORAD_CHEQUE_LIST = LIST;
