import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ch-item',
  templateUrl: './ch-item.component.html',
  styleUrls: ['./ch-item.component.scss']
})
export class ChItemComponent implements OnInit {

  @Input() item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
