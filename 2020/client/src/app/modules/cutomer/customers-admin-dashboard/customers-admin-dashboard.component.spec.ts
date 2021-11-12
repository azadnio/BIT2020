import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAdminDashboardComponent } from './customers-admin-dashboard.component';

describe('AdminCustomersDashboardComponent', () => {
  let component: CustomerAdminDashboardComponent;
  let fixture: ComponentFixture<CustomerAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
