import { Component, OnInit } from '@angular/core';
import {RecipeCategory} from '../../models/recipe-category';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-category-menu',
  templateUrl: './recipe-category-menu.component.html',
  styleUrls: ['./recipe-category-menu.component.css']
})
export class RecipeCategoryMenuComponent implements OnInit {

  recipeCategoryList: RecipeCategory[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipeCategoryList();
  }

  getRecipeCategoryList() {
    this.recipeService.getRecipeCategoriesList().subscribe(
      data => this.recipeCategoryList = data
    );
  }

}
