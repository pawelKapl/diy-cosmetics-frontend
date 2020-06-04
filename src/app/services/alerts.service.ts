import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Alert} from '../components/alerts/self-closing-alert/self-closing-alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  alert: Subject<Alert> = new Subject<Alert>();

  constructor() { }

  addNewAlert(message: string, type: string) {
    this.alert.next({
      message: `${message}`,
      type: `${type}`
    });
  }
}
