import { Component, Input, OnInit } from '@angular/core';
import {
  MeetingInputComponent,
  MeetingPopupCloseData,
  MeetingPopupInitData,
} from '../meeting-input/meeting-input.component';
import { MatDialog } from '@angular/material/dialog';
import { Meeting } from '../../../interface/Meeting';
import * as moment from 'moment';
import { deepEquals } from '../../../tools';
import { MeetingService } from '../../../services/state/classroom-meeting';

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
    private meetingService: MeetingService,
  ) {
  }

  ngOnInit(): void {
  }

  editMeeting() {
    this.matDialog.open<MeetingInputComponent, MeetingPopupInitData, MeetingPopupCloseData>(
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
        if (choice && choice.action === 'update') {
          if (!deepEquals(choice.meeting, this.meeting)) {
            this.meetingService.update(choice.meeting).subscribe(updated => {
              if (updated) {
                this.meeting = updated;
              }
            });
          }
        }
      },
    );
  }
}
