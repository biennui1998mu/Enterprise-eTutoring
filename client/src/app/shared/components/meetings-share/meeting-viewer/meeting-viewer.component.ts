import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MeetingInputComponent,
  MeetingPopupCloseData,
  MeetingPopupInitData,
} from '../meeting-input/meeting-input.component';
import { Classroom, CLASSROOM_STATUS } from '../../../interface/Classroom';
import { MeetingQuery, MeetingService } from '../../../services/state/classroom-meeting';
import * as moment from 'moment';

@Component({
  selector: 'app-meeting-viewer',
  templateUrl: './meeting-viewer.component.html',
  styleUrls: ['./meeting-viewer.component.scss'],
})
export class MeetingViewerComponent implements OnInit, AfterViewInit {

  @Input()
  classroom: Classroom;

  meetings = this.meetingQuery.selectAll();
  meetingsLoading = this.meetingQuery.selectLoading();
  moment = moment;
  CLASSROOM_STATUS = CLASSROOM_STATUS;

  constructor(
    private matDialog: MatDialog,
    private meetingService: MeetingService,
    private meetingQuery: MeetingQuery,
  ) {
  }

  ngOnInit(): void {
    this.meetingService.get(this.classroom._id);
  }

  ngAfterViewInit() {
  }

  createNew() {
    this.matDialog.open<MeetingInputComponent, MeetingPopupInitData, MeetingPopupCloseData>(
      MeetingInputComponent,
      {
        height: 'max-content',
        maxHeight: '500px',
        width: '350px',
        data: {
          mode: 'new',
          meeting: null,
        },
      },
    ).afterClosed().subscribe(
      choice => {
        if (choice.action === 'create' && choice.meeting) {
          this.meetingService.create(choice.meeting);
        }
      },
    );
  }
}
