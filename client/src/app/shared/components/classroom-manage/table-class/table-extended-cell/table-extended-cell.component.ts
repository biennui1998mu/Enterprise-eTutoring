import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Classroom } from '../../../../interface/Classroom';
import { MatDialog } from '@angular/material/dialog';
import { ResourceMetaComponent } from '../../../resource-share/resource-meta/resource-meta.component';
import { ScheduleViewerComponent } from '../../../schedules-share/schedule-viewer/schedule-viewer.component';
import { DialogAction, PopupClassInfo, TableInfoComponent } from '../../table-info/table-info.component';
import { USER_TYPE } from '../../../../interface/User';

@Component({
  selector: 'app-table-extended-cell',
  templateUrl: './table-extended-cell.component.html',
  styleUrls: ['./table-extended-cell.component.scss'],
})
export class TableExtendedCellComponent implements OnInit {

  @Input()
  classroom: Classroom;

  @Output()
  classroomUpdate: EventEmitter<{
    class: Classroom<string, string, string>,
    action: DialogAction,
  }> = new EventEmitter();

  constructor(
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  popupResource() {
    this.matDialog.open(
      ResourceMetaComponent, {
        width: '300px',
      },
    );
  }

  popupSchedule() {
    this.matDialog.open(
      ScheduleViewerComponent, {
        width: '390px',
      },
    );
  }

  popupEdit(classroom: Classroom) {
    this.matDialog.open<TableInfoComponent, PopupClassInfo, PopupClassInfo>(
      TableInfoComponent, {
        height: 'max-content',
        maxHeight: '700px',
        width: '100%',
        maxWidth: '390px',
        data: {
          class: classroom,
          action: DialogAction.update,
        },
      },
    ).afterClosed().subscribe(
      data => {
        if (!data || data.action === DialogAction.cancel) {
          return;
        }

        this.classroomUpdate.emit({
          class: data.class,
          action: data.action,
        });
      },
    );
  }
}
