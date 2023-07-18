import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterdonateurComponent } from './ajouterdonateur.component';

describe('AjouterdonateurComponent', () => {
  let component: AjouterdonateurComponent;
  let fixture: ComponentFixture<AjouterdonateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterdonateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterdonateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
