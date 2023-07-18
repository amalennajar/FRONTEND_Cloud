import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOffDetailsComponent } from './day-off-details.component';

describe('DayOffDetailsComponent', () => {
  let component: DayOffDetailsComponent;
  let fixture: ComponentFixture<DayOffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayOffDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
