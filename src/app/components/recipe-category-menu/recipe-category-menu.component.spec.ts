import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCategoryMenuComponent } from './recipe-category-menu.component';

describe('RecipeCategoryMenuComponent', () => {
  let component: RecipeCategoryMenuComponent;
  let fixture: ComponentFixture<RecipeCategoryMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCategoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
