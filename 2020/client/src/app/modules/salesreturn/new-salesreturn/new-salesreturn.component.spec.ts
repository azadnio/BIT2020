import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSalesreturnComponent } from './new-salesreturn.component';

describe('NewSalesreturnComponent', () => {
  let component: NewSalesreturnComponent;
  let fixture: ComponentFixture<NewSalesreturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSalesreturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSalesreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
