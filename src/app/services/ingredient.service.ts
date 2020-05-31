import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IngredientQuantity} from '../models/ingredient-quantity';
import {map} from 'rxjs/operators';
import {Ingredient} from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private baseUrl = 'http://localhost:8082/api/recipes';
  private baseIngredientsUrl = 'http://localhost:8082/api/ingredients';


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
