import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../models/recipe';
import {ActivatedRoute} from '@angular/router';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [NgbPaginationConfig]
})
export class RecipeListComponent implements OnInit {

  currentCategoryId = 1;
  previousCategoryId = 1;
  recipes: Recipe[] = [];

  thePageNumber = 1;
  thePageSize = 6;
  theTotalElements = 0;


  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.getRecipeList(); });
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
      this.recipes = data._embedded.recipes;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
