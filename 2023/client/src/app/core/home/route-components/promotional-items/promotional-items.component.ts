import { Component, OnInit } from '@angular/core';
import { ITEMS } from '../home-items/home-items.component';

@Component({
  selector: 'app-promotional-items',
  templateUrl: './promotional-items.component.html',
  styleUrls: ['./promotional-items.component.sass']
})
export class PromotionalItemsComponent implements OnInit {

   items = [...ITEMS, ...ITEMS, ...ITEMS];

  constructor() { }

  ngOnInit(): void {
  }

}
