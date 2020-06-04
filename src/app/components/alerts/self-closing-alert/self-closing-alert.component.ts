import {Component, Input, OnInit} from '@angular/core';
import {AlertsService} from '../../../services/alerts.service';



export interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-self-closing-alert',
  templateUrl: './self-closing-alert.component.html',
  styleUrls: ['./self-closing-alert.component.css']
})
export class SelfClosingAlertComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(private alertsService: AlertsService) {
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }


  ngOnInit(): void {
    this.alertsService.alert.subscribe(data => this.alerts.push(data));
  }
}
