import { Location } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'return-page',
  template: `<button mat-stroked-button (click)="location.back()"> <mat-icon>navigate_before</mat-icon> Back</button>`,
})
export class ReturnPageComponent {
  constructor(public location: Location) { }
}