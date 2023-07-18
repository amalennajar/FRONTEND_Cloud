import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdialogcoursesComponent } from './formdialogcourses.component';

describe('FormdialogcoursesComponent', () => {
  let component: FormdialogcoursesComponent;
  let fixture: ComponentFixture<FormdialogcoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdialogcoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdialogcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
