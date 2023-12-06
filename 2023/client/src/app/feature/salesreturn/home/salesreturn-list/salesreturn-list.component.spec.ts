import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreturnListComponent } from './salesreturn-list.component';

describe('SalesreturnListComponent', () => {
  let component: SalesreturnListComponent;
  let fixture: ComponentFixture<SalesreturnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesreturnListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesreturnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
