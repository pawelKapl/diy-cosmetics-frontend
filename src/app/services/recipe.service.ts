import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Recipe} from '../models/recipe';
import {RecipeCategory} from '../models/recipe-category';
import {AbstractControl} from '@angular/forms';
import {environment} from '../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {AlertsService} from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = `${environment.baseURI}/recipes`;
  private categoriesUrl = `${environment.baseURI}/recipeCategories`;

  constructor(private httpClient: HttpClient,
              private alertsService: AlertsService) {
  }

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
    console.log(`pageSize: ${thePageSize} pageNumber: ${thePage}`);
    const recipesUrl = `${this.baseUrl}?size=${thePageSize}&page=${thePage}`;
    return this.httpClient
      .get<GetResponseRecipes>(recipesUrl);
  }

  getRecipeSearchResults(query: string): Observable<Recipe[]> {
    console.log(`typed query: ${query}`);
    const queryUrl = `${this.baseUrl}/search?query=${query}`;
    return this.httpClient.get<Recipe[]>(queryUrl);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  saveRecipe(recipe: AbstractControl) {
    console.log(recipe.value);
    this.httpClient.post<HttpResponse<any>>(this.baseUrl, JSON.stringify(recipe.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
      console.log(`Saved Recipe: ${JSON.stringify(data)}`);
      if (data.status === 201) {
        this.alertsService.addNewAlert(`Nowy składnik został pomyślnie dodany`, `success`);
      }
    });
  }

  deleteRecipe(recipe: Recipe) {
    console.log(`Deleting recipe: ${recipe.name}...`);
    this.httpClient.delete<HttpResponse<any>>(`${this.baseUrl}/${recipe.id}`, {observe: 'response'}).subscribe(
      data => {
        console.log(data.status),
          this.alertsService.addNewAlert(`Receptura ${recipe.name} nieodwracalnie usunięta!`, 'success');
      });
  }
}

interface GetResponseRecipes {
  content: Recipe[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

