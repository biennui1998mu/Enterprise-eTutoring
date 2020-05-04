import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-input',
  templateUrl: './meeting-input.component.html',
})
export class MeetingInputComponent implements OnInit {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: MeetingPopupInitData,
    public dialogRef: MatDialogRef<MeetingInputComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close({
      meeting: null,
      action: 'cancel',
    } as MeetingPopupCloseData);
  }

  delete() {
    this.dialogRef.close({
      meeting: null,
      action: 'update',
    } as MeetingPopupCloseData);
  }
}

export interface MeetingPopupInitData {
  meeting: any; // TODO: meeting interface
  mode: 'update' | 'new';
}

/**
 * if `action` = 'create', the `meeting` must return the data (the new created model)
 * if `action` = 'update', if the `meeting` is null => the process is delete,
 * if the `meeting` has data => update process.
 */
export interface MeetingPopupCloseData {
  meeting: any,
  action: 'create' | 'update' | 'cancel'
}
