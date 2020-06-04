import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Tool} from '../models/tool';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AbstractControl} from '@angular/forms';
import {AlertsService} from './alerts.service';


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private baseUrl = `${environment.baseURI}/tools`;

  constructor(private httpClient: HttpClient,
              private alertsService: AlertsService) {
  }

  getToolsList(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(this.baseUrl);
  }

  saveTool(tool: AbstractControl) {
    console.log(tool.value);
    this.httpClient.post<HttpResponse<any>>(this.baseUrl, JSON.stringify(tool.value), {
      observe: 'response',
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => {
        console.log(`Saved Tool: ${JSON.stringify(data)}`);
        if (data.status === 201) {
          this.alertsService.addNewAlert(`Nowe narzędzie zostało pomyślnie dodane`, `success`);
        }
      },
      error => {
        console.log(error);
        this.alertsService.addNewAlert(`Coś poszło nie tak, nie udało się dodać nowego narzędzia`, `danger`);
      });
  }
}
