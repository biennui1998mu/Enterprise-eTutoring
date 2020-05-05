import { Component, OnInit } from '@angular/core';
import { ClassroomQuery, ClassroomService } from '../../../shared/services/state/classroom';

@Component({
  selector: 'app-class-manage',
  templateUrl: './class-manage.component.html',
  styleUrls: ['./class-manage.component.scss'],
})
export class ClassManageComponent implements OnInit {
  eventFilter: any;

  classrooms = this.classroomQuery.selectAll();
  classroomLoading = this.classroomQuery.selectLoading();

  constructor(
    private classroomService: ClassroomService,
    private classroomQuery: ClassroomQuery,
  ) {
  }

  ngOnInit(): void {
    this.classroomService.get().subscribe(response => {
      console.log(response);
    });
  }

  applyFilter($event: Event) {

  }
}
