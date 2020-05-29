import {Difficulty} from './difficulty.enum';
import {Tool} from './tool';
import {Step} from './step';

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

}
