import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSalesreturnComponent } from './new-salesreturn.component';

describe('NewSalesreturnComponent', () => {
  let component: NewSalesreturnComponent;
  let fixture: ComponentFixture<NewSalesreturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSalesreturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSalesreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});