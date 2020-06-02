import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe';
import {map} from 'rxjs/operators';
import {RecipeCategory} from '../models/recipe-category';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:8082/api/recipes';
  private categoriesUrl = 'http://localhost:8082/api/recipeCategories';

  constructor(private httpClient: HttpClient) { }

  getRecipeListByCategoryPaginate(thePage: number,
                                  thePageSize: number,
                                  categoryId: number): Observable<GetResponseRecipes> {
    const searchUrl = `${this.baseUrl}/search/findByRecipeCategoriesId?id=${categoryId}`
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
    return this.httpClient.get<RecipeCategory[]>(this.categoriesUrl);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  saveRecipe(recipe: AbstractControl) {
    console.log(recipe.value);
    this.httpClient.post(this.baseUrl, JSON.stringify(recipe.value), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe( data => console.log(`Saved Recipe: ${data}`));
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

