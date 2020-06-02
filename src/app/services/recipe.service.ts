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
    const searchUrl = `${this.baseUrl}?cat=${categoryId}`
                      + `&size=${thePageSize}&page=${thePage}`;
    return this.httpClient.get<GetResponseRecipes>(searchUrl);
  }

  getRecipeCategoriesList(): Observable<RecipeCategory[]> {
    return this.httpClient.get<RecipeCategory[]>(this.categoriesUrl);
  }

  getFullRecipeListPaginate(thePage: number,
                            thePageSize: number): Observable<GetResponseRecipes> {
    const recipesUrl = `${this.baseUrl}?size=${thePageSize}&page=${thePage}`;
    return this.httpClient
                .get<GetResponseRecipes>(recipesUrl);
  }

  getRecipeSearchResults(query: string): Observable<Recipe[]> {
    const queryUrl = `${this.baseUrl}/search?query=${query}`;
    return this.httpClient.get<Recipe[]>(queryUrl);
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

    content: Recipe[];
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

