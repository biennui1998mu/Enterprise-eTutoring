import { Component, OnInit } from '@angular/core';
import { MeetingInputComponent, MeetingPopupInitData } from '../meeting-input/meeting-input.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-panel',
  templateUrl: './meeting-panel.component.html',
})
export class MeetingPanelComponent implements OnInit {

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
