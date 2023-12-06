import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITEMS } from 'src/app/data.service';
import { IItem } from '../../../../../../../interfaces/Item.interface';

@Component({
  selector: 'app-general-view-item',
  templateUrl: './general-view-item.component.html',
  styleUrls: ['./general-view-item.component.scss']
})
export class GeneralViewItemComponent implements OnInit {

  item :IItem | any = {};
  currentImg = '';

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      
      this.itemDetails(paramMap.get('itemId')?.replace(/ITM/, ''));
    });
   }

  ngOnInit(): void {
  }

  itemDetails(itemId: any){
    this.item = ITEMS[itemId]; console.log(this.item);

    this.currentImg = this.item.Images[0];
  }
}
