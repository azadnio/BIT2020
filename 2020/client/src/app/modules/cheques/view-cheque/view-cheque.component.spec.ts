import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChequeComponent } from './view-cheque.component';

describe('ViewChequeComponent', () => {
  let component: ViewChequeComponent;
  let fixture: ComponentFixture<ViewChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
