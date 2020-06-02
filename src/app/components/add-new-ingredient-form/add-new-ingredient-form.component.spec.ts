import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIngredientFormComponent } from './add-new-ingredient-form.component';

describe('AddNewIngredientFormComponent', () => {
  let component: AddNewIngredientFormComponent;
  let fixture: ComponentFixture<AddNewIngredientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewIngredientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIngredientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
