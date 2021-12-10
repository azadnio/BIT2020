import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionType } from 'src/app/sub-modules/common/common.enum';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-rout-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.scss']
})
export class RouteViewComponent implements OnInit {

  subscriptions: Subscription[] = [];
  id: number | null = null;  
  lastFewTransaction:any [] = [];
  

  constructor(
    private activatedRoute: ActivatedRoute,
    public utils: UtilsService
  ) { 

    let sub = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      
      this.id = parseInt(params.get('id') + '');
    })

    this.subscriptions.push(sub);

    this.lastFewTransaction = TRANSACTION;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

    this.utils.unsubscribeSubscriptions(this.subscriptions);
  }

}

const TRANSACTION = [
  {date: new Date('12/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('12/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit },
  {date: new Date('11/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('11/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit },
  {date: new Date('10/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.credit },
  {date: new Date('10/12/2021'), transactionId: 1, amount: 100, balance: 200, transactionType: TransactionType.debit }
];
