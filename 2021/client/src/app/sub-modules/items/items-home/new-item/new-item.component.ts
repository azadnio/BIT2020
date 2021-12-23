import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Status } from 'src/app/sub-modules/common/common.enum';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  public newItemForm: FormGroup;
  public itemstatuses :any = [];

  constructor(
    private formBuilder: FormBuilder,
    public utils: UtilsService
  ) {

    //set customer form fields
    this.newItemForm = this.formBuilder.group({
      Name: ['', Validators.minLength(4)],
      Address: ['', Validators.minLength(3)],
      City: ['', Validators.minLength(3)],
      NIC: ['', [Validators.minLength(10), Validators.maxLength(12)]],
      Email: ['', Validators.email],
      Telephone: [''],
      Mobile: [''],
      CreditLimit: [''],
      Password: [''],
      Image: [''],
      Status: Status.active
    });

    this.itemstatuses = this.utils.convertEnumToArray(Status, this.utils.statusString);
  }

  ngOnInit(): void {
  }

  onSubmit() {
  }

}
