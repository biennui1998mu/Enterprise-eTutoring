import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserQuery, UserService } from '../../../services/state/user';

@Component({
  selector: 'app-setting',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit {

  user = this.userQuery.select();

  constructor(
    public dialogRef: MatDialogRef<AccountMenuComponent>,
    private userService: UserService,
    private userQuery: UserQuery,
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
    this.dialogRef.close();
    // return this.userService.changeStatusUser(this.tokenService.user._id, 2).subscribe(result => {
    //   if (result) {
    //     // event.preventDefault();
    //     this.authorizeService.logout();
    //     this.dialogRef.close();
    //   }
    // });
  }
}
