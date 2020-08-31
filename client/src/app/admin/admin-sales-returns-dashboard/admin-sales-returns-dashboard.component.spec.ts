import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalesReturnsDashboardComponent } from './admin-sales-returns-dashboard.component';

describe('AdminSalesReturnsDashboardComponent', () => {
  let component: AdminSalesReturnsDashboardComponent;
  let fixture: ComponentFixture<AdminSalesReturnsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSalesReturnsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSalesReturnsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
