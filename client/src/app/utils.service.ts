import { Injectable } from '@angular/core';
import { FilterParams } from './common.classes';
import { Location } from '@angular/common';

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


}
