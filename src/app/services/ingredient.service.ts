import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {Ingredient} from '../models/ingredient';
import {AbstractControl} from '@angular/forms';
import {UnitOfMeasure} from '../models/unit-of-measure';
import {environment} from '../../environments/environment';
import {AlertsService} from './alerts.service';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private baseIngredientsUrl = `${environment.baseURI}/ingredients`;
  private baseUomUrl = `${environment.baseURI}/units`;

  private operationSuccessfulEvent: Subject<boolean> = new Subject();


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
    return this.httpClient.get<Ingredient>(`${this.baseIngredientsUrl}/${id}`)
      .pipe(
        catchError((err) => {
          this.alertsService.addNewAlert(`Nie można odnaleźć składnika id: ${id}`, `danger`);
          return of(err);
        }));
  }

  saveIngredient(value: AbstractControl) {
    this.httpClient.post<HttpResponse<any>>(this.baseIngredientsUrl, JSON.stringify(value.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Saved Ingredient: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.alertsService.addNewAlert(`Nowy składnik został pomyślnie dodany`, `success`);
          this.operationSuccessfulEvent.next(true);
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
            this.operationSuccessfulEvent.next(true);
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

  updateIngredient(ingredient: AbstractControl) {
    this.httpClient.put<HttpResponse<any>>(this.baseIngredientsUrl, JSON.stringify(ingredient.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Updated Ingredient: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.operationSuccessfulEvent.next(true);
          this.alertsService.addNewAlert(`Składnik został pomyślnie zaktualizowany`, `success`);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się zaktualizować składnika`, `danger`);
      });
  }

  getReplacements(ingredientId: number): Observable<Ingredient[]> {
    const replacementURL = `${this.baseIngredientsUrl}/${ingredientId}/replacements`;
    return this.httpClient.get<Ingredient[]>(replacementURL);
  }

  saveReplacements(replacements: AbstractControl) {
    const ingredientId = +replacements.get('id').value;
    const replacementURL = `${this.baseIngredientsUrl}/${ingredientId}/replacements`;
    this.httpClient.post(replacementURL, JSON.stringify(replacements.get('replacements').value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(() => console.log(`Replacements added succesfully`),
      error => {
        console.log(error),
          this.alertsService
            .addNewAlert(`Coś poszło nie tak, nie udało się zaktualizować listy zamienników dla składnika`, `danger`);
      }
    );
  }

  get operationSuccessEvent(): Observable<boolean> {
    return this.operationSuccessfulEvent.asObservable();
  }
}

interface GetResponseIngredients {
  content: Ingredient[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
