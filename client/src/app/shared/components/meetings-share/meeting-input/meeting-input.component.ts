import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.formMeeting = this.formBuilder.group({
      title: this.titleInput,
      description: this.descriptionInput,
      address: this.addressInput,
      time: this.timeInput,
    });
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

  }

  update() {

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
