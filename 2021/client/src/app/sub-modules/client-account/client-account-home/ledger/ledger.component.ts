import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransactionType } from 'src/app/sub-modules/common/common.enum';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
  providers: [DatePipe]
})
export class LedgerComponent implements OnInit {

  transactions:any = [];

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.loadTransactions();
  }

  loadTransactions() {

    let groupedValues = TRANSACTION.reduce((a, c) => {

      let yearMonthLabel = this.datePipe.transform(c.date, 'MM/yyyy') as string;

      if (!a[yearMonthLabel])
        a[yearMonthLabel] = [];
      
        a[yearMonthLabel].push(c);

      return a;
    }, <any>{});

    this.transactions = Object.values(groupedValues);

    //add brought forward values
    this.transactions.forEach((e:any, i:number) => {

      let lastEntry = e[e.length - 1]
      , bfAmount = lastEntry.balance - lastEntry.amount;

      e.push({
        transactionId: 'Brought Forward',
        transactionType: bfAmount > 0 ? TransactionType.debit : TransactionType.credit,
        amount: Math.abs(bfAmount),
        bf: true
      });
    });
  }

  getBroughtForwardValue():string{
    return 'asdf'
  }
}

const TRANSACTION = [
  {date: new Date('12/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('12/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit },
  {date: new Date('11/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('11/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit },
  {date: new Date('10/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('10/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit },
  {date: new Date('10/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit },
  {date: new Date('10/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('9/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('9/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit },
  {date: new Date('9/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('8/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit }
];