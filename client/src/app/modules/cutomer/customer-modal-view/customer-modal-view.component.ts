import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModalDialogData } from 'src/app/common.interface';

@Component({
  selector: 'app-customer-modal-view',
  templateUrl: './customer-modal-view.component.html',
  styleUrls: ['./customer-modal-view.component.scss']
})
export class CustomerModalViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IModalDialogData
  ) { }

  ngOnInit(): void {
  }

}
