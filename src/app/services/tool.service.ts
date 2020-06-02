import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tool} from '../models/tool';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private baseUrl = 'http://localhost:8082/api/tools';

  constructor(private httpClient: HttpClient) { }

  getToolsList(): Observable<Tool[]> {
    return this.httpClient.get<Tool[]>(this.baseUrl);
  }
}

// interface GetResponseTools {
//   _embedded: {
//     tools: Tool[];
//   };
// }
