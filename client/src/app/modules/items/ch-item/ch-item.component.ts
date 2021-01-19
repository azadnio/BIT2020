import { Item } from './../../../../../../classes/Item.calss';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ch-item',
  templateUrl: './ch-item.component.html',
  styleUrls: ['./ch-item.component.scss']
})
export class ChItemComponent implements OnInit {

  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
    console.log(this.item)
  }

}
