import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemsDashboardComponent } from './admin-items-dashboard.component';

describe('AdminItemsDashboardComponent', () => {
  let component: AdminItemsDashboardComponent;
  let fixture: ComponentFixture<AdminItemsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
