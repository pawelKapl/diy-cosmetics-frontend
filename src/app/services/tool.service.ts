import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tool} from '../models/tool';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private baseUrl = `${environment.baseURI}/tools`;

  constructor(private httpClient: HttpClient) { }

  getToolsList(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(this.baseUrl);
  }
}
