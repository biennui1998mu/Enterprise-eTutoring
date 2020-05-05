import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User, USER_TYPE } from '../../../interface/User';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom, CLASSROOM_STATUS } from '../../../interface/Classroom';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.scss'],
})
export class TableInfoComponent implements OnInit {

  classTitle = new FormControl('', [
    Validators.required, Validators.minLength(1),
  ]);

  classDescription = new FormControl('', [
    Validators.required, Validators.minLength(1),
  ]);

  classTutor = new FormControl(null, [
    Validators.required,
  ]);

  classStudent = new FormControl(null, [
    Validators.required,
  ]);

  USER_TYPE = USER_TYPE;
  DIALOG_ACTION = DialogAction;
  CLASSROOM_STATUS = CLASSROOM_STATUS;
  classInfo: FormGroup;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: PopupClassInfo,
    public dialogRef: MatDialogRef<TableInfoComponent>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.classInfo = this.fb.group({
      title: this.classTitle,
      description: this.classDescription,
      student: this.classStudent,
      tutor: this.classTutor,
    });

    this.setFormData();
  }

  emitAction(actionEmit: DialogAction) {
    let classroom: Classroom<string, string, string> = null;
    if (this.data.action === DialogAction.new && actionEmit === DialogAction.new) {
      classroom = {
        title: this.classTitle.value,
        description: this.classDescription.value,
        student: (this.classStudent.value as User)._id,
        tutor: (this.classTutor.value as User)._id,
        status: CLASSROOM_STATUS.open,
      };
    } else if (actionEmit === DialogAction.update) {
      classroom = Object.assign(
        {},
        this.data.class,
        {
          title: this.classTitle.value,
          description: this.classDescription.value,
        },
      );
    } else if (actionEmit === DialogAction.disable || actionEmit === DialogAction.open) {
      classroom = Object.assign(
        {},
        this.data.class,
        {
          status: actionEmit === DialogAction.open ?
            CLASSROOM_STATUS.open : CLASSROOM_STATUS.closed,
        },
      );
    }
    this.dialogRef.close({
      class: classroom,
      action: actionEmit,
    } as PopupClassInfo);
  }

  private setFormData() {
    if (this.data.class && this.data.action === DialogAction.update) {
      this.classTitle.setValue(this.data.class.title);
      this.classDescription.setValue(this.data.class.description);
      this.classStudent.setValue(this.data.class.student);
      this.classTutor.setValue(this.data.class.tutor);
      // if closed then lock all field
      if (this.data.class.status === CLASSROOM_STATUS.closed) {
        this.classTitle.disable();
        this.classDescription.disable();
        this.classStudent.disable();
        this.classTutor.disable();
      } else if (this.data.action === DialogAction.update) {
        // prevent update student/tutor, only allow to close the class and change info
        this.classStudent.disable();
        this.classTutor.disable();
      }
    }
  }
}


export interface PopupClassInfo {
  class: Classroom<any, any, any>;
  action: DialogAction,
}

export enum DialogAction {
  new,
  update,
  disable,
  open,
  cancel
}
