import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.scss']
})
export class RouteViewComponent implements OnInit {

  subscriptions: Subscription[] = [];
  id;

  constructor(
    private activatedRoute: ActivatedRoute,
    public utils: UtilsService
  ) { 

    let sub = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      
      this.id = +params.get('id');
    })

    this.subscriptions.push(sub);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

    this.utils.unsubscribeSubscriptions(this.subscriptions);
  }
}
