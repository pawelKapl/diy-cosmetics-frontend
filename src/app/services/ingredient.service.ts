import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IngredientQuantity} from '../models/ingredient-quantity';
import {catchError, map} from 'rxjs/operators';
import {Ingredient} from '../models/ingredient';
import {AbstractControl} from '@angular/forms';
import {Encoding} from 'tslint/lib/utils';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private baseUrl = 'http://localhost:8082/api/recipes';
  private baseIngredientsUrl = 'http://localhost:8082/api/ingredients';
  private baseQuantitiesUrl = 'http://localhost:8082/api/ingredientQuantities';


  constructor(private httpClient: HttpClient) {
  }

  getIngredientQuantitiesForRecipe(id: number): Observable<IngredientQuantity[]> {
    const searchUrl = `${this.baseUrl}/${id}/ingredientQuantities`;
    return this.httpClient.get<GetResponseIngredientQuantities>(searchUrl).pipe(
      map(response => response._embedded.ingredientQuantities)
    );
  }

  getFullIngredientList(thePage: number,
                        thePageSize: number, order: string): Observable<GetResponseIngredients> {

    return this.httpClient.get<GetResponseIngredients>(`${this.baseIngredientsUrl}` +
      `?sort=name,${order}&size=${thePageSize}&page=${thePage}`);
  }

  getIngredientById(id: number): Observable<Ingredient> {
    return this.httpClient.get<Ingredient>(`${this.baseIngredientsUrl}/${id}`);
  }

  saveIngredient(value: AbstractControl) {
    console.log(value.value);
    this.httpClient.post(this.baseIngredientsUrl, JSON.stringify(value.value), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe( data => console.log(`Saved Ingredient: ${data}`));
  }

  saveQuantity(ingredientQuantities: any): Observable<IngredientQuantity[]> {
    var json = JSON.stringify(ingredientQuantities);
    console.log(json.substr(1, json.length - 2));

    return this.httpClient.post<IngredientQuantity[]>(this.baseQuantitiesUrl, json.substr(1, json.length - 2), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}

interface GetResponseIngredientQuantities {
  _embedded: {
    ingredientQuantities: IngredientQuantity[];
  };
}

interface GetResponseIngredients {
  _embedded: {
    ingredients: Ingredient[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
