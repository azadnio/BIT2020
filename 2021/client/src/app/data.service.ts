import { Injectable } from '@angular/core';
import { IItem } from '../../../interfaces/Item.interface'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  user = {
    name: 'Azad Distributors',
    id: 24,
  };

  public cart = [
    {image: 'assets/items/memoty.jpg', description:'this is a test', price: 2000, 
    discount: 10, quantity: 4},
    {image: 'assets/items/memoty.jpg', description:'this is a test', price: 2000, discount: 10, quantity: 4},
    {image: 'assets/items/memoty.jpg', description:'this is a test', price: 2000, discount: 10, quantity: 4},
    {image: 'assets/items/memoty.jpg', description:'this is a test', price: 2000, discount: 10, quantity: 4},
    {image: 'assets/items/memoty.jpg', description:'this is a test', price: 2000, discount: '10%', quantity: 4},
  ];
  
}

let items:IItem[] = [];

for(let i = 1; i < 6; i++)
      items.push({
            Id: i,
            Category: i % 10 + '',
            Brand: i + '',
            Title: 'Shangai Door Lock ' + i,
            Description: 'china made high quality door locks ' +i ,
            Info: 'this is something more onfo adsvsvdvavf a dfa aff adf fd d d df f afuhiadfhv uavhufb ' + i,
            Price:1000 + i,
            Unit: 1,
            Images:['assets/items/doorhandle.jpg', 'assets/items/doorhandle2.jpg','assets/items/doorhanle.jpg', 'assets/items/doorlock2.jpg']
      });

export const ITEMS = items;
