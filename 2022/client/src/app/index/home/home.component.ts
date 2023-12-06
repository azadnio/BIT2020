import { Component, OnInit } from '@angular/core';
import { ITEMS } from 'src/app/data.service';
import { IItem } from '../../../../../interfaces/Item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  specialItems:IItem[] = ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
