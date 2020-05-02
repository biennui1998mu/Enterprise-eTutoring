import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interface/User';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './user-dialog-info.component.html',
  styleUrls: ['./user-dialog-info.component.scss'],
})
export class UserDialogInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PopupUserInfo,
    public dialogRef: MatDialogRef<UserDialogInfoComponent>,
  ) {
  }

  ngOnInit(): void {
  }

}

export interface PopupUserInfo {
  user: User;
  action: 'new' | 'update' | 'delete'
}
