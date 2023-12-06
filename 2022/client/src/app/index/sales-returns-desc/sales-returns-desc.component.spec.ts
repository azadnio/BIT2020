import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnsDescComponent } from './sales-returns-desc.component';

describe('SalesReturnsDescComponent', () => {
  let component: SalesReturnsDescComponent;
  let fixture: ComponentFixture<SalesReturnsDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesReturnsDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnsDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
