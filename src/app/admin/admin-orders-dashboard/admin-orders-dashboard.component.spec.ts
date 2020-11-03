import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersDashboardComponent } from './admin-orders-dashboard.component';

describe('AdminOrdersDashboardComponent', () => {
  let component: AdminOrdersDashboardComponent;
  let fixture: ComponentFixture<AdminOrdersDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
