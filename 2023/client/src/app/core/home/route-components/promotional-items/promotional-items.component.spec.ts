import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalItemsComponent } from './promotional-items.component';

describe('PromotionalItemsComponent', () => {
  let component: PromotionalItemsComponent;
  let fixture: ComponentFixture<PromotionalItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionalItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionalItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
