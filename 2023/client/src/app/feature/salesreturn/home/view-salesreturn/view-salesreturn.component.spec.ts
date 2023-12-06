import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalesreturnComponent } from './view-salesreturn.component';

describe('ViewSalesreturnComponent', () => {
  let component: ViewSalesreturnComponent;
  let fixture: ComponentFixture<ViewSalesreturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSalesreturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSalesreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
