import { Injectable } from '@angular/core';
import { FilterParams } from './common.classes';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChequeStatus } from './common.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  setSearchURL(filterParams: FilterParams, location: Location, curURL: string, curentQueryParamStr = '') {

    //compose query params
    let queryParamsStrList = []
    for (let [key, value] of Object.entries(filterParams))
      if (value != undefined && value != '')
        queryParamsStrList.push(key + '=' + value);

    // set the URL
    if (queryParamsStrList.length) {

      location.go(curURL + '?' + queryParamsStrList.join('&'));
      return true;
    }
    else if (curentQueryParamStr.trim())
      location.go(curURL);

    return false;
  }

  unsubscribeSubscriptions(subscriptions: Subscription []){

    subscriptions.forEach(el => el.unsubscribe() );
  }

  chequeStatusesToString(status: ChequeStatus) {
    
    switch(status){
      case ChequeStatus.pending: return 'Pending';
      case ChequeStatus.returned: return 'Returned';
    }
  }
}
