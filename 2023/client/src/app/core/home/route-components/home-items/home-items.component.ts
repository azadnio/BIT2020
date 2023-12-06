import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/feature/items/models/item.model';

@Component({
  selector: 'app-home-items',
  templateUrl: './home-items.component.html',
  styleUrls: ['./home-items.component.sass']
})
export class HomeItemsComponent implements OnInit {

  items = ITEMS;

  newarrivals = [...ITEMS, ...ITEMS];

  constructor() { }

  ngOnInit(): void {
  }

}

export const ITEMS: Item[] = [
  {
    id: 1,
    imageUrl: 'assets/items/brassstay.jpg',
    description: 'Item 1',
    price: 10.99
  },
  {
    id: 2,
    imageUrl: 'assets/items/casementhandle.jpg',
    description: 'Item 2',
    price: 5.99
  },
  {
    id: 3,
    imageUrl: 'assets/items/casementhandle.jpg',
    description: 'Item 3',
    price: 12.49
  },
  {
    id: 4,
    imageUrl: 'assets/items/casementhandle.jpg',
    description: 'Item 4',
    price: 8.75
  },
  {
    id: 5,
    imageUrl: 'assets/items/casementhandle.jpg',
    description: 'Item 5',
    price: 9.99
  }
];
