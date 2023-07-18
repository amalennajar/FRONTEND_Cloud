import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogisticComponent } from './add-logistic.component';

describe('AddLogisticComponent', () => {
  let component: AddLogisticComponent;
  let fixture: ComponentFixture<AddLogisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLogisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLogisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
