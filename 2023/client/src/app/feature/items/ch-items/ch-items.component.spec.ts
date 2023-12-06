import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChItemsComponent } from './ch-items.component';

describe('ChItemsComponent', () => {
  let component: ChItemsComponent;
  let fixture: ComponentFixture<ChItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
