import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../models/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {Alert} from '../alerts/self-closing-alert/self-closing-alert.component';
import {AlertsService} from '../../services/alerts.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

  currentCategoryId = 1;
  previousCategoryId = 1;
  recipes: Recipe[] = [];

  thePageNumber = 1;
  thePageSize = 6;
  theTotalElements = 0;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getRecipeList();
    });
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
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    this.recipeService.getFullRecipeListPaginate(this.thePageNumber - 1,
      this.thePageSize)
      .subscribe(this.processResult());
  }

  private handleRecipeSearchResults() {
    this.recipeService.getRecipeSearchResults(this.route.snapshot.paramMap.get('query')).subscribe(
      data => {
        this.recipes = data;
      }
    );
  }

  private handleRecipeListByCategory() {
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

    if (this.currentCategoryId != this.previousCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.recipeService.getRecipeListByCategoryPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }

  private processResult() {
    return data => {
      this.recipes = data.content;
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
    };
  }
}
