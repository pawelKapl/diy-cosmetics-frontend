import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IngredientService} from '../../services/ingredient.service';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe();
  private recipeId: number;


  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private route: ActivatedRoute,
              private modal: ConfirmationModalComponent) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.loadRecipeAndSortSteps());
  }

  private loadRecipeAndSortSteps() {
    this.recipeId = +this.route.snapshot.paramMap.get('id');

    console.log(`loading recipe with id: ${this.recipeId}`);

    this.recipeService.getRecipe(this.recipeId).subscribe(
      data => {
        this.recipe = data;
        this.recipe.steps.sort((s1, s2) => s1.seq - s2.seq);
      }
    );
  }

  delete(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }

  open(content) {
    this.modal.open(content);
  }
}
