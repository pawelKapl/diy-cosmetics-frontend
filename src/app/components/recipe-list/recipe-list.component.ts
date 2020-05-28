import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../models/recipe';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  id: number;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.getRecipeList(); });
    this.getRecipeList();
  }

  getRecipeList() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasQuery: boolean = this.route.snapshot.paramMap.has('query');

    if (hasCategoryId) {
      this.handleRecipeListByCategory();
    } else if (hasQuery) {
      this.handleRecipeSearchResults();
    } else {
      this.handleFullRecipeList();
    }
  }

  private handleFullRecipeList() {
    this.recipeService.getFullRecipeList().subscribe(
      data => {
        this.recipes = data;
      }
    );
  }

  private handleRecipeSearchResults() {
    this.recipeService.getRecipeSearchResults(this.route.snapshot.paramMap.get('query')).subscribe(
      data => {
        this.recipes = data;
      }
    );
  }

  private handleRecipeListByCategory() {
    this.recipeService.getRecipeListByCategory(+this.route.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.recipes = data;
        }
      );
  }
}
