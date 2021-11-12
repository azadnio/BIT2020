export interface IInovice {

    id: number
    date: string
    customer: number
}

let LIST: IInovice[] = [];



export interface IInvoiceDashboard {

    id: number
    date: Date
    customer: string
    amount: number
    status: number
    createdBy: string
    custId: number
}

let LIST2: IInvoiceDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST2.push({
        id: index,
        customer: 'customer ' + index,
        custId: index,
        date: new Date(),
        amount: 10 * index,
        status: index % 4,
        createdBy: 'Staff ' + index      
    });

export const DASHBORAD_INVOICE_LIST = LIST2;

export interface ISalesReturnDashboard {

    id: number
    date: Date
    customer: string
    amount: number
    status: number
    createdBy: string
    custId: number
}

let LIST3: ISalesReturnDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST3.push({
        id: index,
        customer: 'customer ' + index,
        custId: index,
        date: new Date(),
        amount: 10 * index,
        status: index % 4,
        createdBy: 'Staff ' + index
    });

export const DASHBORAD_SALESRETURN = LIST3;