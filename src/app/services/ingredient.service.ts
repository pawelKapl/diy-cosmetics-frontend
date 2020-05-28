import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IngredientQuantity} from '../models/ingredient-quantity';
import {Recipe} from '../models/recipe';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private baseUrl = 'http://localhost:8082/api/recipes';

  constructor(private httpClient: HttpClient) { }

  getIngredientQuantitiesForRecipe(id: number): Observable<IngredientQuantity[]> {
    const searchUrl = `${this.baseUrl}/${id}/ingredientQuantities`;
    return this.httpClient.get<GetResponseIngredientQuantities>(searchUrl).pipe(
      map(response => response._embedded.ingredientQuantities)
    );
  }

}

interface GetResponseIngredientQuantities {
  _embedded: {
    ingredientQuantities: IngredientQuantity[];
  };
}
