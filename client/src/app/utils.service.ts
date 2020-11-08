import { Injectable } from '@angular/core';
import { FilterParams } from './common.classes';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChequeStatus, OrderStatus, PaymentStatus, PaymentType, Status } from './common.enum';

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

  unsubscribeSubscriptions(subscriptions: Subscription[]) {

    subscriptions.forEach(el => el.unsubscribe());
  }

  chequeStatusesToString(status: ChequeStatus) {

    switch (status) {
      case ChequeStatus.pending: return 'Pending';
      case ChequeStatus.returned: return 'Returned';
    }
  }

  statusString(status: Status) {
    switch (status) {
      case Status.active: return 'ACTIVE';
      case Status.deleted: return 'DELETED';
    }
  }

  paymentStatusString(status: PaymentStatus) {
    switch (status) {
      case PaymentStatus.paid: return 'PAID';
      case PaymentStatus.pending: return 'PENDING';
    }
  }

  paymentTypeString(status: PaymentType) {
    switch (status) {
      case PaymentType.cash: return 'Cash';
      case PaymentType.cheque: return 'Cheque';
      case PaymentType.cashAndCheque: return 'Cash and cheque'
    }
  }

  oderStatusString(status: OrderStatus){
    switch(status){
      case OrderStatus.canceled: return 'CANCELED';
      case OrderStatus.deleverd: return 'Delevered';
      case OrderStatus.new: return 'New';
      case OrderStatus.processing: return 'Processing';
      case OrderStatus.withHold: return 'With Hold';
    }
  }
}
