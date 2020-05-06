import { Component } from '@angular/core';
import { ClassroomQuery, ClassroomService } from '../../services/state/classroom';
import { Classroom, CLASSROOM_STATUS } from '../../interface/Classroom';
import { signatureName } from '../../tools';
import { UserQuery } from '../../services/state/user';
import { USER_TYPE } from '../../interface/User';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.scss'],
})
export class GeneralLayoutComponent {
  readonly USER_TYPE = USER_TYPE;
  readonly CLASSROOM_STATUS = CLASSROOM_STATUS;

  events: string[] = [];
  opened: boolean;

  classrooms = this.classroomQuery.selectAll();

  constructor(
    private classroomService: ClassroomService,
    private classroomQuery: ClassroomQuery,
    public userQuery: UserQuery,
  ) {
    // update the list class
    this.classroomService.get().subscribe();
  }

  get viewUserType() {
    return this.userQuery.getValue().level;
  }

  signatureClassroom(classroom: Classroom) {
    return signatureName(classroom.title);
  }
}
