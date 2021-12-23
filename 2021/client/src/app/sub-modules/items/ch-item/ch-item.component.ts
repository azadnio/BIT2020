import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ch-item',
  templateUrl: './ch-item.component.html',
  styleUrls: ['./ch-item.component.scss']
})
export class ChItemComponent implements OnInit {

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
