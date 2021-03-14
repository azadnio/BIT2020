import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsClientDashboardComponent } from './items-client-dashboard.component';

describe('ItemsClientDashboardComponent', () => {
  let component: ItemsClientDashboardComponent;
  let fixture: ComponentFixture<ItemsClientDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsClientDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsClientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
