import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsAdminDashboardComponent } from './payments-admin-dashboard.component';

describe('PaymentsAdminDashboardComponent', () => {
  let component: PaymentsAdminDashboardComponent;
  let fixture: ComponentFixture<PaymentsAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
