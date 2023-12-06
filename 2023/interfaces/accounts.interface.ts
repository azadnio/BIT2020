import { Status } from "src/app/core/common/common.enum";


export interface IAccountDashboard {

    id: number,
    customerName: string,
    city: string,
    balance: number,
    lastInvoice: Date,
    lastPayment: Date,
    status: Status,
    pendingCheques: number,
    returnCheques:number
}

let LIST2: IAccountDashboard[] = [];

for (let index = 1; index <= 100; index++)
    LIST2.push({        
        id: index,
        customerName: 'customer ' + index,
        city: 'Kandy',
        balance: index * 120,
        lastInvoice: new Date(),
        lastPayment: new Date(),
        status: Status.active,
        pendingCheques: index * 2,
        returnCheques: index * 0.25
    });

export const CUSTOMER_ACCOUNTS_LIST = LIST2;
