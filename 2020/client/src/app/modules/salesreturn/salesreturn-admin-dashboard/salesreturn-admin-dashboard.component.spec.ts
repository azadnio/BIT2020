import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreturnAdminDashboardComponent } from './salesreturn-admin-dashboard.component';

describe('SalesreturnAdminDashboardComponent', () => {
  let component: SalesreturnAdminDashboardComponent;
  let fixture: ComponentFixture<SalesreturnAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesreturnAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesreturnAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
