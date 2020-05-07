import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/state/user';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }
}
