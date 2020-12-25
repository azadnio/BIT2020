import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesAdminDashboardComponent } from './invoices-admin-dashboard.component';

describe('AdminInvoicesDashboardComponent', () => {
  let component: InvoicesAdminDashboardComponent;
  let fixture: ComponentFixture<InvoicesAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
