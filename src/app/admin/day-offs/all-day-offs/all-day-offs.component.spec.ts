import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDayOffsComponent } from './all-day-offs.component';

describe('AllDayOffsComponent', () => {
  let component: AllDayOffsComponent;
  let fixture: ComponentFixture<AllDayOffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDayOffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDayOffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
