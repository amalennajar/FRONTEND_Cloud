import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLogisticComponent } from './edit-logistic.component';

describe('EditLogisticComponent', () => {
  let component: EditLogisticComponent;
  let fixture: ComponentFixture<EditLogisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLogisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLogisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
