import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModalViewComponent } from './customer-modal-view.component';

describe('CustomerModalViewComponent', () => {
  let component: CustomerModalViewComponent;
  let fixture: ComponentFixture<CustomerModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
