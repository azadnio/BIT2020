import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesListComponent } from './cheques-list.component';

describe('ChequesListComponent', () => {
  let component: ChequesListComponent;
  let fixture: ComponentFixture<ChequesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
