import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
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
    this.route.paramMap.subscribe(() => this.loadRecipe());
  }

  private loadRecipe() {
    this.recipeId = +this.route.snapshot.paramMap.get('id');

    console.log(`loading recipe with id: ${this.recipeId}`);

    this.recipeService.getRecipe(this.recipeId).subscribe(
      data => {
        this.recipe = data;
      }
    );
  }

  open(content) {
    this.modal.open(content);
  }

  delete(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }
}
