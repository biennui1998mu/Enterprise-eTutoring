import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingInputComponent, MeetingPopupInitData } from '../meeting-input/meeting-input.component';

@Component({
  selector: 'app-meeting-viewer',
  templateUrl: './meeting-viewer.component.html',
  styleUrls: ['./meeting-viewer.component.scss'],
})
export class MeetingViewerComponent implements OnInit, AfterViewInit {

  constructor(
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
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
