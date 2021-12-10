import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesandreturnsComponent } from './salesreturns.component';

describe('SalesandreturnsComponent', () => {
  let component: SalesandreturnsComponent;
  let fixture: ComponentFixture<SalesandreturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesandreturnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesandreturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
