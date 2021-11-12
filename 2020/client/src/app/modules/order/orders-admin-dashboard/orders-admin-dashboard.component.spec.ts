import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAdminDashboardComponent } from './orders-admin-dashboard.component';

describe('OrdersAdminDashboardComponent', () => {
  let component: OrdersAdminDashboardComponent;
  let fixture: ComponentFixture<OrdersAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
