import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ingredient} from '../models/ingredient';
import {AbstractControl} from '@angular/forms';
import {UnitOfMeasure} from '../models/unit-of-measure';
import {environment} from '../../environments/environment';
import {AlertsService} from './alerts.service';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private baseIngredientsUrl = `${environment.baseURI}/ingredients`;
  private baseUomUrl = `${environment.baseURI}/units`;


  constructor(private httpClient: HttpClient, private alertsService: AlertsService) {
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
    this.httpClient.post<HttpResponse<any>>(this.baseIngredientsUrl, JSON.stringify(value.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Saved Ingredient: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.alertsService.addNewAlert(`Nowy składnik został pomyślnie dodany`, `success`);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się dodać nowej receptury`, `danger`);
      });
  }

  deleteIngredient(ingredient: Ingredient) {
    console.log(`Deleteing ingredient ${ingredient.name}...`);
    return this.httpClient
      .delete<HttpResponse<any>>(`${this.baseIngredientsUrl}/${ingredient.id}`, {observe: 'response'})
      .subscribe(
        res => {
          console.log(res);
          if (res.status === 200) {
            this.alertsService.addNewAlert(`Składnik ${ingredient.name} trwale usunięty!`, 'success');
          }
        },
        err => {
          if (err.status === 409) {
            this.alertsService
              .addNewAlert(`Nie można usunąć składnika ${ingredient.name}, gdyż jest wykorzystywany w recepturach`, 'danger');
          } else {
            this.alertsService
              .addNewAlert(`Coś poszło nie tak, nie można usunąć składnika ${ingredient.name}`, 'danger');
          }
        },
        () => console.log(`Http Request Completed.`)
      );
  }
}

interface GetResponseIngredients {
  content: Ingredient[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
