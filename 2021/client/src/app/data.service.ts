import { Injectable } from '@angular/core';

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
