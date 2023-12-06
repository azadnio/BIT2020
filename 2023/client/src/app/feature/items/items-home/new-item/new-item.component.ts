import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status, ItemUnit } from 'src/app/core/common/common.enum';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.sass']
})
export class NewItemComponent implements OnInit {

  public newItemForm: FormGroup;
  public itemstatuses :any = [];
  public itemUnits: any = [];
  public category = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  public brand = ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'];

  constructor(
    private formBuilder: FormBuilder,
    public utils: UtilsService
  ) {

    //set customer form fields
    this.newItemForm = this.formBuilder.group({
      Title: ['', Validators.minLength(4)],
      Description: ['', Validators.minLength(5)],
      Info: ['', Validators.minLength(5)],
      Price: ['', [Validators.min(0)]],
      Unit: ['', Validators.required],
      Images: ['', Validators.required],
      Brand: [''],
      Category: [''],
      Status: Status.active
    });

    this.itemstatuses = this.utils.convertEnumToArray(Status, this.utils.statusString);
    this.itemUnits = this.utils.convertEnumToArray(ItemUnit, this.utils.itemUnitsToString);
  }

  ngOnInit(): void {
  }

  onSubmit() {
  }

}