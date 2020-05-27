import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../models/recipe';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:8082/api/recipes';

  constructor(private httpClient: HttpClient) { }

  getRecipeList(): Observable<Recipe[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.recipes)
    );
  }
}

interface GetResponse {
  _embedded: {
    recipes: Recipe[];
  };
}
