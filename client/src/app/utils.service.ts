import { Injectable } from '@angular/core';
import { FilterParams } from './common.classes';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  setSearchURL(filterParams: FilterParams, location: Location, curURL: string) {

    //compose query params
    let queryParamsStrList = []
    for (let [key, value] of Object.entries(filterParams))
      if (value != undefined)
        queryParamsStrList.push(key + '=' + value);
    
    // set the URL
    if (queryParamsStrList)
      location.go(curURL + '?' + queryParamsStrList.join('&'));
  }
}
