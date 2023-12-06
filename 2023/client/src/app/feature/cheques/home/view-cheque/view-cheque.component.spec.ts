import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChequeComponent } from './view-cheque.component';

describe('ViewChequeComponent', () => {
  let component: ViewChequeComponent;
  let fixture: ComponentFixture<ViewChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
