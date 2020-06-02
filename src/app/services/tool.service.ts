import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tool} from '../models/tool';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AbstractControl} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private baseUrl = `${environment.baseURI}/tools`;

  constructor(private httpClient: HttpClient) { }

  getToolsList(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(this.baseUrl);
  }

  saveTool(tool: AbstractControl) {
    console.log(tool.value);
    this.httpClient.post(this.baseUrl, JSON.stringify(tool.value), {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).subscribe(data => console.log(`Saved Tool: ${JSON.stringify(data)}`));
  }
}
