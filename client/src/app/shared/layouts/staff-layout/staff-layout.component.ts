import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/state/user';

@Component({
  selector: 'app-staff-layout',
  templateUrl: './staff-layout.component.html',
  styleUrls: ['./staff-layout.component.scss'],
})
export class StaffLayoutComponent implements OnInit {

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
