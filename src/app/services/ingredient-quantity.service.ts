import {Injectable} from '@angular/core';
import {AlertsService} from './alerts.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AbstractControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientQuantityService {

  private baseUrl = `${environment.baseURI}`;

  private operationSuccessfulEvent: Subject<boolean> = new Subject();

  constructor(private alertsService: AlertsService,
              private httpClient: HttpClient) {
  }

  deleteIngredientQuantity(quantityId: number) {
    const deleteUrl = `${this.baseUrl}/quantities/${quantityId}`;
    this.httpClient.delete<HttpResponse<any>>(deleteUrl, {observe: 'response'}).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          this.alertsService.addNewAlert(`Składnik został nieodwracalnie usunięty z recepty!`, 'success');
          this.operationSuccessfulEvent.next(true);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się usunąć składnika o id: ${quantityId}`, `danger`);
      });
  }

  addNewIngredientQuantityToRecipe(recipeId: number, quantity: AbstractControl) {
    const addUrl = `${this.baseUrl}/recipes/${recipeId}/quantities`;

    this.httpClient.post<HttpResponse<any>>(addUrl, JSON.stringify(quantity.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Updated Recipe: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.alertsService.addNewAlert(`Nowy skłandnik został pomyślnie dodany do receptury`, `success`);
          this.operationSuccessfulEvent.next(true);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się dodać nowego składnika do receptury`, `danger`);
      }
    );
  }

  get operationSuccessEvent(): Observable<boolean> {
    return this.operationSuccessfulEvent.asObservable();
  }
}
