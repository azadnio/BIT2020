import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsHomeComponent } from './items-home.component';

describe('ItemsHomeComponent', () => {
  let component: ItemsHomeComponent;
  let fixture: ComponentFixture<ItemsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
