import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingInputComponent, MeetingPopupInitData } from '../meeting-input/meeting-input.component';
import { Classroom, CLASSROOM_STATUS } from '../../../interface/Classroom';
import { MeetingQuery, MeetingService } from '../../../services/state/classroom-meeting';
import { Meeting } from '../../../interface/Meeting';
import * as moment from 'moment';

@Component({
  selector: 'app-meeting-viewer',
  templateUrl: './meeting-viewer.component.html',
  styleUrls: ['./meeting-viewer.component.scss'],
})
export class MeetingViewerComponent implements OnInit, AfterViewInit {

  @Input()
  classroom: Classroom;

  meetings: Meeting[] = [];
  moment = moment;
  CLASSROOM_STATUS = CLASSROOM_STATUS;

  constructor(
    private matDialog: MatDialog,
    private meetingService: MeetingService,
    private meetingQuery: MeetingQuery,
  ) {
    this.meetingQuery.selectAll().subscribe(meetings => {
      this.meetings = meetings;
    });
  }

  ngOnInit(): void {
    this.meetingService.get(this.classroom._id);
  }

  ngAfterViewInit() {
  }

  createNew() {
    this.matDialog.open<MeetingInputComponent, MeetingPopupInitData>(
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
        console.log(choice);
      },
    );
  }
}
