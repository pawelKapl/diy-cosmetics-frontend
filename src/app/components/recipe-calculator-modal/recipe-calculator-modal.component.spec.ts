import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCalculatorModalComponent } from './recipe-calculator-modal.component';

describe('RecipeCalculatorModalComponent', () => {
  let component: RecipeCalculatorModalComponent;
  let fixture: ComponentFixture<RecipeCalculatorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCalculatorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCalculatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
