import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { FilterParams } from './core/common/common.classes';
import { ChequeStatus, Status, PaymentStatus, PaymentType, OrderStatus, ItemUnit } from './core/common/common.enum';

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

  itemUnitsToString(status: ItemUnit){

    switch (status) {
      case ItemUnit.Nos: return 'Nos';
      case ItemUnit.Kg: return 'Kg';
      case ItemUnit.Ltr: return 'Ltr';
      case ItemUnit.Pkt: return 'Pkt';
      case ItemUnit.Box: return 'Box';
      case ItemUnit.Dozn: return 'Dzn';
      case ItemUnit.Barrel: return 'Barrel';
      case ItemUnit.Pcs: return 'Pcs';
      case ItemUnit.Feet: return 'Ft';
      case ItemUnit.Roll: return 'Roll';
    }
  }

  chequeStatusesToString(status: ChequeStatus) {

    switch (status) {
      case ChequeStatus.pending: return 'Pending';
      case ChequeStatus.returned: return 'Returned';
      case ChequeStatus.passed: return 'Passed';
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
      case PaymentType.multiPay: return 'Multi Pay'
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

  convertEnumToArray(enumObj: any, toStringCallback:any = null){
    const arrayObjects = []
    // Retrieve key and values using Object.entries() method.
    for (const [propertyKey, propertyValue] of Object.entries(enumObj)) {

      // Ignore keys that are not numbers
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }

      let label = '';
      if (toStringCallback)
        label = toStringCallback(propertyValue);

      // Add keys and values to array
      arrayObjects.push({ id: propertyValue, name: propertyKey, label });
    }

    return arrayObjects;
  }
}
