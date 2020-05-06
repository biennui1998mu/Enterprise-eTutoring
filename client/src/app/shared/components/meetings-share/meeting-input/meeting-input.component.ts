import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meeting } from '../../../interface/Meeting';
import { ClassroomQuery } from '../../../services/state/classroom';
import * as moment from 'moment';

@Component({
  selector: 'app-meeting-input',
  templateUrl: './meeting-input.component.html',
})
export class MeetingInputComponent implements OnInit {

  titleInput = new FormControl('', [
    Validators.required, Validators.minLength(1),
  ]);
  descriptionInput = new FormControl('', [
    Validators.required, Validators.minLength(1),
  ]);
  addressInput = new FormControl('', [
    Validators.required, Validators.minLength(1),
  ]);
  timeInput = new FormControl(
    { value: '', disabled: true }, [
      Validators.required, Validators.minLength(1),
    ]);

  formMeeting: FormGroup;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: MeetingPopupInitData,
    public dialogRef: MatDialogRef<MeetingInputComponent>,
    private classroomQuery: ClassroomQuery,
    private formBuilder: FormBuilder,
  ) {
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    // Prevent day before now being selected
    return moment(d).isAfter(moment());
  };

  ngOnInit(): void {
    this.formMeeting = this.formBuilder.group({
      title: this.titleInput,
      description: this.descriptionInput,
      address: this.addressInput,
      time: this.timeInput,
    });

    if (this.data.mode === 'update') {
      this.titleInput.setValue(this.data.meeting?.title);
      this.descriptionInput.setValue(this.data.meeting?.description);
      this.addressInput.setValue(this.data.meeting?.address);
      this.timeInput.setValue(this.data.meeting?.time);
    }
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

  create() {
    const meeting: Partial<Meeting<string, string>> = this.formMeeting.value;
    meeting.classroom = this.classroomQuery.getActiveId().toString();
    // because we disable field time in formBuilder, it does not include in .value
    meeting.time = moment(this.timeInput.value).toDate();
    this.dialogRef.close({
      meeting: meeting,
      action: 'create',
    } as MeetingPopupCloseData);
  }

  update() {
    const meetingUpdate = Object.assign(
      {},
      this.data.meeting,
      this.formMeeting.value,
    );
    this.dialogRef.close({
      meeting: meetingUpdate,
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
