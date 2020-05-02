import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-setting',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AccountMenuComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    // return this.userService.changeStatusUser(this.tokenService.user._id, 2).subscribe(result => {
    //   if (result) {
    //     // event.preventDefault();
    //     this.authorizeService.logout();
    //     this.dialogRef.close();
    //   }
    // });
  }
}
