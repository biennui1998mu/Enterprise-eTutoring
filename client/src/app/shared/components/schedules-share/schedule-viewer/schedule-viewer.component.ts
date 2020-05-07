import { Component, OnInit } from '@angular/core';
import { Classroom } from '../../../interface/Classroom';
import { ScheduleQuery, ScheduleService } from '../../../services/state/classroom-schedule';
import { USER_TYPE } from '../../../interface/User';
import { filter, map, tap } from 'rxjs/operators';
import { ClassroomQuery } from '../../../services/state/classroom';
import { Schedule } from '../../../interface/Schedule';

@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.scss'],
})
export class ScheduleViewerComponent implements OnInit {
  classroom: Classroom = this.classroomQuery.getActive();

  schedules: Schedule[] = [];
  schedulesLoading = this.scheduleQuery.selectLoading();

  constructor(
    private scheduleService: ScheduleService,
    private scheduleQuery: ScheduleQuery,
    private classroomQuery: ClassroomQuery,
  ) {
    this.scheduleQuery.selectAll().subscribe(schedules => {
      this.schedules = schedules;
    });
    this.classroomQuery.selectActive().pipe(
      map(classrooms => {
        if (Array.isArray(classrooms)) {
          return classrooms[0] as Classroom;
        }
        return classrooms;
      }),
      tap(classroom => {
        if (classroom) {
          this.schedules = [];
        }
      }),
      filter(classroom => !!classroom),
    ).subscribe(classroom => {
      this.classroom = classroom;
      if (this.classroom) {
        this.scheduleService.get(this.classroom._id);
      }
    });
  }

  ngOnInit(): void {

  }

}

export interface PopupScheduleInfo {
  classroom: Classroom;
  level: USER_TYPE
}
