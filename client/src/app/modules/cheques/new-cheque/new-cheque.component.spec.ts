import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChequeComponent } from './new-cheque.component';

describe('NewChequeComponent', () => {
  let component: NewChequeComponent;
  let fixture: ComponentFixture<NewChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
