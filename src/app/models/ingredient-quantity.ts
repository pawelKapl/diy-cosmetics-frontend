import {Ingredient} from './ingredient';
import {UnitOfMeasure} from './unit-of-measure';

export class IngredientQuantity {
  id: number;
  amount: number;
  calculatedAmount: number = this.amount;
  ingredient: Ingredient;
  unitOfMeasure: UnitOfMeasure;
}
