import { Injectable } from '@angular/core';
import { FilterParams } from './common.classes';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  setSearchURL(filterParams: FilterParams, location: Location, curURL: string) {

    let queryParamsStr = ''
    for (let [key, value] of Object.entries(filterParams))
      if (value != undefined)
        queryParamsStr += key + '=' + value;
    
    if (queryParamsStr)
      location.go(curURL + '?' + queryParamsStr);
  }
}
