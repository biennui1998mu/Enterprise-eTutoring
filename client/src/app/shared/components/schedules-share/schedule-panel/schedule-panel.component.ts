import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../../../interface/Schedule';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-panel',
  templateUrl: './schedule-panel.component.html',
  styleUrls: ['./schedule-panel.component.scss'],
})
export class SchedulePanelComponent implements OnInit {

  @Input()
  schedule: Schedule;

  moment = moment;
  Date = Date;

  constructor() {
  }

  ngOnInit(): void {
  }

}
