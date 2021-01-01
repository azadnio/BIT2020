import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesAdminDashboardComponent } from './cheques-admin-dashboard.component';

describe('ChequesAdminDashboardComponent', () => {
  let component: ChequesAdminDashboardComponent;
  let fixture: ComponentFixture<ChequesAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequesAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
