import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLogisticsComponent } from './list-logistics.component';

describe('ListLogisticsComponent', () => {
  let component: ListLogisticsComponent;
  let fixture: ComponentFixture<ListLogisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLogisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
