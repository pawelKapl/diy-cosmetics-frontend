import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientReplacementsModalComponent } from './ingredient-replacements-modal.component';

describe('IngredientReplacementsModalComponent', () => {
  let component: IngredientReplacementsModalComponent;
  let fixture: ComponentFixture<IngredientReplacementsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientReplacementsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientReplacementsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
