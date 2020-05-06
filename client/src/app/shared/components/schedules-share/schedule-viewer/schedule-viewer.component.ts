import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../../../interface/Classroom';

@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.scss'],
})
export class ScheduleViewerComponent implements OnInit {

  @Input()
  classroom: Classroom;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.classroom);
  }

}
