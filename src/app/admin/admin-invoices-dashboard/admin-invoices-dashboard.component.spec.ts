import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvoicesDashboardComponent } from './admin-invoices-dashboard.component';

describe('AdminInvoicesDashboardComponent', () => {
  let component: AdminInvoicesDashboardComponent;
  let fixture: ComponentFixture<AdminInvoicesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInvoicesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInvoicesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
