import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';
import {ActivatedRoute} from '@angular/router';
import {IngredientService} from '../../services/ingredient.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

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
              config: NgbModalConfig,
              private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
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
    this.modalService.open(content);
  }

  delete(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe);
  }
}
