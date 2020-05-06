import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../../../interface/Classroom';
import { ScheduleQuery, ScheduleService } from '../../../services/state/classroom-schedule';

@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.scss'],
})
export class ScheduleViewerComponent implements OnInit {

  @Input()
  classroom: Classroom;

  schedules = this.scheduleQuery.selectAll();
  schedulesLoading = this.scheduleQuery.selectLoading();

  constructor(
    private scheduleService: ScheduleService,
    private scheduleQuery: ScheduleQuery,
  ) {
  }

  ngOnInit(): void {
    this.scheduleService.get(this.classroom._id);
  }

}
