import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDashBoardComponent } from './items-dash-board.component';

describe('ItemsDashBoardComponent', () => {
  let component: ItemsDashBoardComponent;
  let fixture: ComponentFixture<ItemsDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
