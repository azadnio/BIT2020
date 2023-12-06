import { Location } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'return-page',
  template: `<a mat-stroked-button (click)="location.back()"> <mat-icon>navigate_before</mat-icon> Back</a>`,
})
export class ReturnPageComponent {
  constructor(public location: Location) { }
}