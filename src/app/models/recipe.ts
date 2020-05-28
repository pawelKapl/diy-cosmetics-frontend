import {Difficulty} from './difficulty.enum';

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

}
