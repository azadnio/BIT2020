import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAdminDashboardComponent } from './reports-admin-dashboard.component';

describe('ReportsAdminDashboardComponent', () => {
  let component: ReportsAdminDashboardComponent;
  let fixture: ComponentFixture<ReportsAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
