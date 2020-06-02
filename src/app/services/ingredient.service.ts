import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IngredientQuantity} from '../models/ingredient-quantity';
import {catchError, map} from 'rxjs/operators';
import {Ingredient} from '../models/ingredient';
import {AbstractControl} from '@angular/forms';
import {Encoding} from 'tslint/lib/utils';
import {UnitOfMeasure} from '../models/unit-of-measure';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private baseIngredientsUrl = 'http://localhost:8082/api/ingredients';
  private baseUomUrl = 'http://localhost:8082/api/units';


  constructor(private httpClient: HttpClient) {
  }

  getUnitsOfMeasure(): Observable<UnitOfMeasure[]> {
    return this.httpClient.get<UnitOfMeasure[]>(this.baseUomUrl);
  }

  getFullIngredientList(thePage: number,
                        thePageSize: number, order: string): Observable<GetResponseIngredients> {
    console.log(`pageSize: ${thePageSize} pageNumber: ${thePage} order: ${order}`);
    return this.httpClient.get<GetResponseIngredients>(`${this.baseIngredientsUrl}` +
      `?sort=${order}&size=${thePageSize}&page=${thePage}`);
  }

  getIngredientById(id: number): Observable<Ingredient> {
    return this.httpClient.get<Ingredient>(`${this.baseIngredientsUrl}/${id}`);
  }

  saveIngredient(value: AbstractControl) {
    console.log(value.value);
    this.httpClient.post(this.baseIngredientsUrl, JSON.stringify(value.value), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => console.log(`Saved Ingredient: ${data}`));
  }
}

interface GetResponseIngredients {
    content: Ingredient[];
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}
