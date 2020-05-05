import { Component, OnInit } from '@angular/core';
import { ClassroomQuery, ClassroomService } from '../../../shared/services/state/classroom';
import { Classroom } from '../../../shared/interface/Classroom';
import {
  DialogAction,
  PopupClassInfo,
  TableInfoComponent,
} from '../../../shared/components/classroom-manage/table-info/table-info.component';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-class-manage',
  templateUrl: './class-manage.component.html',
  styleUrls: ['./class-manage.component.scss'],
})
export class ClassManageComponent implements OnInit {
  eventFilter: Subject<Event> = new Subject<Event>();
  classrooms = this.classroomQuery.selectAll();

  constructor(
    private classroomService: ClassroomService,
    private classroomQuery: ClassroomQuery,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.classroomService.get().subscribe(response => {
      console.log(response);
    });
  }

  applyFilter($event: Event) {
    this.eventFilter.next($event);
  }

  updateClassInfo($event: {
    action: DialogAction; class: Classroom<string, string, string>
  }) {
    if ($event.action === DialogAction.disable) {
      this.classroomService.closeClass($event.class);
    } else if ($event.action === DialogAction.update) {
      this.classroomService.updateClass($event.class);
    }
  }

  openDialogCreate() {
    this.matDialog.open<TableInfoComponent, PopupClassInfo, PopupClassInfo>(
      TableInfoComponent, {
        height: 'max-content',
        maxHeight: '700px',
        width: '100%',
        maxWidth: '390px',
        data: {
          class: null,
          action: DialogAction.new,
        },
      },
    ).afterClosed().subscribe(
      data => {
        if (!data || data.action === DialogAction.cancel) {
          return;
        }
        if (data.action === DialogAction.new && data.class) {
          this.classroomService.createClass(data.class);
        }
      },
    );
  }
}
