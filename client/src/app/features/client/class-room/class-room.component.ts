import { Component, OnInit } from '@angular/core';
import { ClassroomQuery, ClassroomService, ClassroomStore } from '../../../shared/services/state/classroom';
import { Classroom } from '../../../shared/interface/Classroom';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss'],
})
export class ClassRoomComponent implements OnInit {

  classroomId: string = this.classroomQuery.getActiveId() as string;
  classroom: Classroom;

  constructor(
    private classroomQuery: ClassroomQuery,
    private classroomService: ClassroomService,
    private classroomStore: ClassroomStore,
  ) {
    this.classroomQuery.selectAll().pipe(
      filter(list => list.length > 0),
      switchMap(() => {
        // list classroom updated on `general-layout`
        return classroomQuery.selectActive();
      }),
    ).subscribe(classViewing => {
      this.classroom = classViewing;
    });
  }

  ngOnInit(): void {
  }

}
