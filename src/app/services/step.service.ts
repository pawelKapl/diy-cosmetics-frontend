import {Injectable} from '@angular/core';
import {AlertsService} from './alerts.service';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private baseUrl = environment.baseURI;

  private operationSuccessfulEvent: Subject<boolean> = new Subject();

  constructor(private alertsService: AlertsService,
              private httpClient: HttpClient) {
  }


  addStep(id: number, step: AbstractControl) {
    const addUrl = `${this.baseUrl}/recipes/${id}/steps`;

    this.httpClient.post<HttpResponse<any>>(addUrl, JSON.stringify(step.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Updated Recipe: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.alertsService.addNewAlert(`Nowy krok został pomyślnie dodany do receptury`, `success`);
          this.operationSuccessfulEvent.next(true);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się dodać nowego kroku do receptury`, `danger`);
      }
    );
  }

  deleteStep(stepId: number) {
    const deleteUrl = `${this.baseUrl}/steps/${stepId}`;

    this.httpClient.delete<HttpResponse<any>>(deleteUrl, {observe: 'response'}).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          this.alertsService.addNewAlert(`Krok został nieodwracalnie usunięty!`, 'success');
          this.operationSuccessfulEvent.next(true);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się usunąć kroku o id: ${stepId}`, `danger`);
      });
  }

  get operationSuccessEvent(): Observable<boolean> {
    return this.operationSuccessfulEvent.asObservable();
  }

}
