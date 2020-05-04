import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../../shared/interface/User';

@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.scss'],
})
export class StaffManageComponent implements OnInit {
  eventFilter: Subject<Event> = new Subject<Event>();

  staffs: User[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  applyFilter($event: Event) {
    this.eventFilter.next($event);
  }
}
