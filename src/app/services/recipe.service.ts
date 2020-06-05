import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Recipe} from '../models/recipe';
import {RecipeCategory} from '../models/recipe-category';
import {AbstractControl} from '@angular/forms';
import {environment} from '../../environments/environment';
import {AlertsService} from './alerts.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = `${environment.baseURI}/recipes`;
  private categoriesUrl = `${environment.baseURI}/recipeCategories`;

  constructor(private httpClient: HttpClient,
              private alertsService: AlertsService,
              private router: Router) {
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
    return this.httpClient.get<Recipe>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError((err) => {
          this.router.navigate(['/']);
          return of(err);
        }));
  }

  saveRecipe(recipe: AbstractControl) {
    this.httpClient.post<HttpResponse<any>>(this.baseUrl, JSON.stringify(recipe.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Saved Recipe: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.alertsService.addNewAlert(`Nowa receptura została pomyślnie dodana`, `success`);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się dodać nowej receptury`, `danger`);
      }
    );
  }

  updateRecipe(recipe: AbstractControl) {
    this.httpClient.put<HttpResponse<any>>(this.baseUrl, JSON.stringify(recipe.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Updated Recipe: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.alertsService.addNewAlert(`Receptura została pomyślnie zaktualizowana`, `success`);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się zaktualizować receptury`, `danger`);
      });
  }

  deleteRecipe(recipe: Recipe) {
    console.log(`Deleting recipe: ${recipe.name}...`);
    this.httpClient.delete<HttpResponse<any>>(`${this.baseUrl}/${recipe.id}`, {observe: 'response'}).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          this.alertsService.addNewAlert(`Receptura ${recipe.name} została nieodwracalnie usunięta!`, 'success');
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się usunąć receptury ${recipe.name}`, `danger`);
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

