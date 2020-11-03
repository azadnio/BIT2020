import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChequesDashboardComponent } from './admin-cheques-dashboard.component';

describe('AdminChequesDashboardComponent', () => {
  let component: AdminChequesDashboardComponent;
  let fixture: ComponentFixture<AdminChequesDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChequesDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChequesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
