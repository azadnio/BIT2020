import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-view-item',
  templateUrl: './general-view-item.component.html',
  styleUrls: ['./general-view-item.component.scss']
})
export class GeneralViewItemComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      
      this.itemDetails(paramMap.get('itemId'));
    });
   }

  ngOnInit(): void {
  }

  itemDetails(itemId: any){
    console.log('loading item details')
  }
}
