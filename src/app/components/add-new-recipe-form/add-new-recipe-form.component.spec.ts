import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRecipeFormComponent } from './add-new-recipe-form.component';

describe('AddNewRecipeFormComponent', () => {
  let component: AddNewRecipeFormComponent;
  let fixture: ComponentFixture<AddNewRecipeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRecipeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
