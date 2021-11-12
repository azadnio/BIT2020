import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChItemComponent } from './ch-item.component';

describe('ChItemComponent', () => {
  let component: ChItemComponent;
  let fixture: ComponentFixture<ChItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
