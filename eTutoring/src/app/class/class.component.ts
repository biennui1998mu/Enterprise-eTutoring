import { Component, OnInit } from '@angular/core';
import {MeetingComponent} from '../meeting/meeting.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  createMeetingDialog(): void{
    this.dialog.open(MeetingComponent, {
      width: '350px',
      height: '350px'
    });
  }

}
