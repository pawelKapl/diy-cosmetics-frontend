import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Tool} from '../models/tool';
import {Observable, of, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {AbstractControl} from '@angular/forms';
import {AlertsService} from './alerts.service';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private baseUrl = `${environment.baseURI}/tools`;

  private operationSuccessfulEvent: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient,
              private alertsService: AlertsService) {
  }

  getToolsList(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(this.baseUrl);
  }

  getToolById(id: number) {
    return this.httpClient.get<Tool>(`${this.baseUrl}/${id}`).pipe(
      catchError((err) => {
        this.alertsService.addNewAlert(`Nie można odnaleźć narzędzia: ${id}`, `danger`);
        return of(err);
      })
    );
  }

  saveTool(tool: AbstractControl) {
    console.log(tool.value);
    this.httpClient.post<HttpResponse<any>>(this.baseUrl, JSON.stringify(tool.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Saved Tool: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.operationSuccessfulEvent.next(true);
          this.alertsService.addNewAlert(`Nowe narzędzie zostało pomyślnie dodane`, `success`);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się dodać nowego narzędzia`, `danger`);
      });
  }

  updateTool(tool: AbstractControl) {
    this.httpClient.put<HttpResponse<any>>(this.baseUrl, JSON.stringify(tool.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Updated Tool: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.operationSuccessfulEvent.next(true);
          this.alertsService.addNewAlert(`Narzędzie zostało pomyślnie zaktualizowane`, `success`);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się zaktualizować narzędzia`, `danger`);
      });
  }

  deleteTool(tool: Tool) {
    const deleteUrl = `${this.baseUrl}/${tool.id}`;

    this.httpClient.delete<HttpResponse<any>>(deleteUrl, {observe: 'response'}).subscribe(
      data => {
        console.log(data);
        if (data.status === 200) {
          this.operationSuccessfulEvent.next(true);
          this.alertsService.addNewAlert(`Narzędzie zostało nieodwracalnie usunięte!`, 'success');
        }
      },
      err => {
        if (err.status === 409) {
          this.alertsService
            .addNewAlert(`Nie można usunąć narzędzia ${tool.name}, gdyż jest wykorzystywane w recepturach`, 'danger');
        } else {
          this.alertsService
            .addNewAlert(`Coś poszło nie tak, nie można usunąć narzędzia ${tool.name}`, 'danger');
        }
      },
      () => console.log(`Http Request Completed.`)
    );
  }

  get operationSuccessEvent(): Observable<boolean> {
    return this.operationSuccessfulEvent.asObservable();
  }
}
