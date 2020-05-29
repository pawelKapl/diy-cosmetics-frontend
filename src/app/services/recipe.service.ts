import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe';
import {map} from 'rxjs/operators';
import {RecipeCategory} from '../models/recipe-category';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:8082/api/recipes';
  private categoriesUrl = 'http://localhost:8082/api/recipeCategories';

  constructor(private httpClient: HttpClient) { }

  getRecipeListByCategory(id: number): Observable<Recipe[]> {
    const queryUrl = `${this.baseUrl}/search/findByCategoriesId?size=6&id=${id}`;
    return this.httpClient.get<GetResponseRecipes>(queryUrl).pipe(
      map(response => response._embedded.recipes)
    );
  }

  getRecipeListByCategoryPaginate(thePage: number,
                                  thePageSize: number,
                                  categoryId: number): Observable<GetResponseRecipes> {
    const searchUrl = `${this.baseUrl}/search/findByCategoriesId?id=${categoryId}`
                      + `&size=${thePageSize}&page=${thePage}`;
    return this.httpClient.get<GetResponseRecipes>(searchUrl);
  }

  getFullRecipeListPaginate(thePage: number,
                            thePageSize: number): Observable<GetResponseRecipes> {
    const recipesUrl = `${this.baseUrl}?size=${thePageSize}&page=${thePage}`;
    return this.httpClient
                .get<GetResponseRecipes>(recipesUrl);
  }

  getRecipeSearchResults(query: string): Observable<Recipe[]> {
    const queryUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase?query=${query}`;
    return this.httpClient.get<GetResponseRecipes>(queryUrl).pipe(
      map(response => response._embedded.recipes)
    );
  }

  getRecipeCategoriesList(): Observable<RecipeCategory[]> {
    return this.httpClient.get<GetResponseRecipeCategories>(this.categoriesUrl).pipe(
      map(response => response._embedded.recipeCategories)
    );
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.baseUrl}/${id}`);
  }
}

interface GetResponseRecipes {
  _embedded: {
    recipes: Recipe[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseRecipeCategories {
  _embedded: {
    recipeCategories: RecipeCategory[];
  };
}
