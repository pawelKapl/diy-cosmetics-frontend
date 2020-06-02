import {Difficulty} from './difficulty.enum';
import {Tool} from './tool';
import {Step} from './step';
import {IngredientQuantity} from './ingredient-quantity';

export class Recipe {
  id: number;
  name: string;
  intro: string;
  description: string;
  difficulty: Difficulty;
  prepTime: number;
  dateCreated: Date;
  dateUpdated: Date;
  imageUrl: string;
  tools: Tool[];
  steps: Step[];
  ingredientQuantities: IngredientQuantity[];

}
