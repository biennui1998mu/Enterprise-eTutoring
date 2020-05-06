import { Component, Input, OnInit } from '@angular/core';
import { MeetingInputComponent, MeetingPopupInitData } from '../meeting-input/meeting-input.component';
import { MatDialog } from '@angular/material/dialog';
import { Meeting } from '../../../interface/Meeting';
import * as moment from 'moment';

@Component({
  selector: 'app-meeting-panel',
  templateUrl: './meeting-panel.component.html',
})
export class MeetingPanelComponent implements OnInit {

  @Input()
  meeting: Meeting;
  moment = moment;
  Date = Date;

  constructor(
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  editMeeting() {
    this.matDialog.open<MeetingInputComponent, MeetingPopupInitData>(
      MeetingInputComponent,
      {
        height: 'max-content',
        maxHeight: '500px',
        width: '350px',
        data: {
          mode: 'update',
          meeting: this.meeting,
        },
      },
    ).afterClosed().subscribe(
      choice => {
        console.log(choice);
      },
    );
  }
}
