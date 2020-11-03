export interface IInovice {

    id: number
    date: string
    customer: number
}

let LIST: IInovice[] = [];



export interface IInvoiceDashboard {

    id: number
    date: string
    customer: string
    amount: number
    status: number
    createdBy: string

}

let LIST2: IInvoiceDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST2.push({
        id: index,
        customer: 'customer ' + index,
        date: index + '/10/2020',
        amount: 10 * index,
        status: index % 4,
        createdBy: 'Staff ' + index      
    });

export const DASHBORAD_INVOICE_LIST = LIST2;
