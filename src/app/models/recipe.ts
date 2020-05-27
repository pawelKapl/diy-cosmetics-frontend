import {Difficulty} from './difficulty.enum';

export class Recipe {
  name: string;
  description: string;
  difficulty: Difficulty;
  prepTime: number;
  dateCreated: Date;
  dateUpdated: Date;
  imageUrl: string;

}
