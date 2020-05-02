import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { UserQuery } from '../../../services/state/user';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {

  isUserMenuOpen: boolean = false;
  user = this.userQuery.select();

  constructor(
    private dialog: MatDialog,
    private userQuery: UserQuery,
  ) {
  }

  ngOnInit(): void {
  }

  openUserMenu() {
    this.isUserMenuOpen = true;
    this.dialog.open(AccountMenuComponent, {
      position: {
        top: `calc(3rem + 2px)`,
        right: `8px`,
      },
      width: '200px',
      backdropClass: `bg-transparent`,
      panelClass: `setting-modal-box`,
    }).afterClosed().subscribe(
      () => this.isUserMenuOpen = false,
    );
  }
}
