import { TestBed } from '@angular/core/testing';

import { IngredientQuantityService } from './ingredient-quantity.service';

describe('IngredientQuantityService', () => {
  let service: IngredientQuantityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientQuantityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
