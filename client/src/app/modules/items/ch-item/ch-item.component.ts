import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ch-item',
  templateUrl: './ch-item.component.html',
  styleUrls: ['./ch-item.component.scss']
})
export class ChItemComponent implements OnInit {

  @Input() item;
  constructor() { }

  ngOnInit(): void {
    console.log(this.item)
  }

}
