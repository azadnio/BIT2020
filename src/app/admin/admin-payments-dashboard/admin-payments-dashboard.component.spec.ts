import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentsDashboardComponent } from './admin-payments-dashboard.component';

describe('AdminPaymentsDashboardComponent', () => {
  let component: AdminPaymentsDashboardComponent;
  let fixture: ComponentFixture<AdminPaymentsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
