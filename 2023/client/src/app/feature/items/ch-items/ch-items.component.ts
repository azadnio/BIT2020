import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ch-item',
  templateUrl: './ch-items.component.html',
  styleUrls: ['./ch-items.component.sass']
})
export class ChItemsComponent  implements OnInit {

  @Input() item: any;
  itemURL = '';

  constructor(private router: Router) { }

  ngOnInit(): void {console.log(this.item);
    
    let base = '/';
    if (this.router.url.includes('admin'))
      base += 'admin';
    
    this.itemURL = base + '/items/CT' + this.item.Category + '/ITM' + this.item.Id;
  }

}
