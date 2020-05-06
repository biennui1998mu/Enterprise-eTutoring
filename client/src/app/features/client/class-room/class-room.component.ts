import { Component, OnInit } from '@angular/core';
import { ClassroomQuery, ClassroomService } from '../../../shared/services/state/classroom';
import { Classroom } from '../../../shared/interface/Classroom';
import { ActivatedRoute, Router } from '@angular/router';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.data.subscribe(fromResolver => {
      const classResolver = fromResolver[0] as Classroom;
      if (!classResolver) {
        this.router.navigate(['/client', 'dashboard']);
        return;
      }
      this.classroom = classResolver;
    });
  }

  ngOnInit(): void {
  }

}
