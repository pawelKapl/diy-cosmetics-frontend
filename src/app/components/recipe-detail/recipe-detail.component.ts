import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {StepService} from '../../services/step.service';
import {IngredientQuantityService} from '../../services/ingredient-quantity.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe();
  private recipeId: number;


  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private modal: ConfirmationModalComponent,
              private authenticationService: AuthenticationService,
              private stepService: StepService,
              private quantityService: IngredientQuantityService) {
  }

  ngOnInit(): void {
    this.eventSubscriptions();
    this.route.paramMap.subscribe(() => this.loadRecipeAndSortSteps());
  }

  private eventSubscriptions() {
    this.stepService.operationSuccessEvent.subscribe(() => this.loadRecipeAndSortSteps());
    this.quantityService.operationSuccessEvent.subscribe(() => this.loadRecipeAndSortSteps());
    this.recipeService.operationSuccessEvent.subscribe(() => this.loadRecipeAndSortSteps());
  }

  private loadRecipeAndSortSteps() {
    this.recipeId = +this.route.snapshot.paramMap.get('id');

    console.log(`loading recipe with id: ${this.recipeId}`);

    this.recipeService.getRecipe(this.recipeId).subscribe(
      data => {
        this.recipe = data;
        this.recipe.steps.sort((s1, s2) => s1.seq - s2.seq);
        this.recipe.ingredientQuantities.forEach(i => i.calculatedAmount = i.amount);
      }
    );
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }

  open(content) {
    this.modal.open(content);
  }

  deleteStep(id: number) {
    this.stepService.deleteStep(id);
  }

  deleteQuantity(id: number) {
    this.quantityService.deleteIngredientQuantity(id);
  }

  userCheck() {
    return this.authenticationService.isUserLoggedIn();
  }
}
