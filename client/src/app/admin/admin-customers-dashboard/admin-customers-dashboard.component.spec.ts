import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomersDashboardComponent } from './admin-customers-dashboard.component';

describe('AdminCustomersDashboardComponent', () => {
  let component: AdminCustomersDashboardComponent;
  let fixture: ComponentFixture<AdminCustomersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomersDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
