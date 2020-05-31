import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {IngredientQuantity} from '../../models/ingredient-quantity';
import {IngredientService} from '../../services/ingredient.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe();
  recipeIngredientQuantities: IngredientQuantity[];
  private recipeId: number;

  constructor(private recipeService: RecipeService,
              private ingredientService: IngredientService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.loadRecipe());
    this.loadRecipeIngredientsList();
  }

  private loadRecipe() {
    this.recipeId = +this.route.snapshot.paramMap.get('id');

    this.recipeService.getRecipe(this.recipeId).subscribe(
      data => {
        this.recipe = data;
      }
    );
  }

  private loadRecipeIngredientsList() {
    this.ingredientService.getIngredientQuantitiesForRecipe(this.recipeId).subscribe(
      data => {
        this.recipeIngredientQuantities = data;
      }
    );
  }
}
