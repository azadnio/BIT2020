import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralViewItemComponent } from './general-view-item.component';

describe('GeneralViewItemComponent', () => {
  let component: GeneralViewItemComponent;
  let fixture: ComponentFixture<GeneralViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralViewItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
