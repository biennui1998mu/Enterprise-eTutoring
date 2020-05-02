import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, USER_TYPE } from '../../../interface/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageValidate } from '../../../tools/form-validation.helper';
import { deepMutableObject, extractInfo, getPreviewBase64 } from '../../../tools';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './user-dialog-info.component.html',
  styleUrls: ['./user-dialog-info.component.scss'],
})
export class UserDialogInfoComponent implements OnInit {

  userInfo: FormGroup;
  nameField = new FormControl(
    '', [
      Validators.required, Validators.minLength(1),
    ],
  );
  usernameField = new FormControl(
    '', [
      Validators.required, Validators.minLength(1), Validators.email,
    ],
  );
  passwordField = new FormControl(
    null, [
      Validators.minLength(1),
    ],
  );
  levelField = new FormControl(
    USER_TYPE.student, [
      Validators.required, Validators.min(USER_TYPE.staff), Validators.max(USER_TYPE.student),
    ],
  );
  avatarField = new FormControl(
    USER_TYPE.student, [
      Validators.required,
    ], [
      new ImageValidate().validate,
    ],
  );

  readonly USER_TYPE = USER_TYPE;
  cachedAvatar: string = '';
  private cacheFileUpload: File = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PopupUserInfo,
    public dialogRef: MatDialogRef<UserDialogInfoComponent>,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    /**
     * Password will be validated separately
     */
    this.userInfo = this.formBuilder.group({
      nameField: this.nameField,
      usernameField: this.usernameField,
      levelField: this.levelField,
      avatarField: this.avatarField,
    });

    if (this.data.user) {
      this.setupForm();
    }
  }

  debug() {
    console.log(this.userInfo);
  }

  update() {
    const user: User = this.mapBasicFields();
    if (this.passwordField.value.length > 0) {
      if (!this.passwordField.valid) {
        return;
      }
      user.password = this.passwordField.value;
    }

    this.dialogRef.close({
      action: 'update',
      user: user,
    } as PopupUserInfo);
  }

  create() {
    const user: User = this.mapBasicFields();
    if (!this.passwordField.valid) {
      return;
    }
    user.password = this.passwordField.value;
    this.dialogRef.close({
      action: 'new',
      user: user,
    } as PopupUserInfo);
  }

  close() {
    this.dialogRef.close({
      action: 'cancel',
      user: null,
    } as PopupUserInfo);
  }

  delete() {
    this.dialogRef.close({
      action: 'delete',
      user: this.data.user,
    } as PopupUserInfo);
  }

  fileUpload(changeEvent: Event) {
    this.cacheFileUpload = null;
    const target = changeEvent.target as HTMLInputElement;
    if (target.files.length === 1) {
      const validFileInfo = extractInfo(target.files.item(0), {
        specifiedType: 'image',
      });
      if (!validFileInfo) {
        this.avatarField.setValue(null);
        return;
      }
      this.avatarField.markAsPending();
      getPreviewBase64(validFileInfo.selfInstance).then(
        base64 => {
          if (base64) {
            this.cacheFileUpload = validFileInfo.selfInstance;
          }
          this.avatarField.setValue(base64);
        },
      );
    } else {
      this.avatarField.setValue(null);
    }
  }

  resetAvatar() {
    this.avatarField.setValue(this.cachedAvatar);
  }

  private mapBasicFields() {
    const user: User = deepMutableObject(this.data.user);
    user.name = this.nameField.value;
    user.username = this.usernameField.value;
    user.level = this.levelField.value;
    if (user.avatar !== this.avatarField.value && this.cacheFileUpload) {
      user.avatarNew = this.cacheFileUpload;
    } else {
      user.avatar = this.avatarField.value;
    }
    return user;
  }

  private setupForm() {
    const user = this.data.user;
    this.nameField.setValue(user?.name);
    this.usernameField.setValue(user?.username);
    this.levelField.setValue(user?.level);
    this.avatarField.setValue(user?.avatar);
    this.cachedAvatar = user?.avatar;
  }
}

export interface PopupUserInfo {
  user: User;
  action: 'new' | 'update' | 'delete' | 'cancel'
}
