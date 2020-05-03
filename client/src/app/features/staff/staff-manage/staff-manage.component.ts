import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.scss'],
})
export class StaffManageComponent implements OnInit {
  eventFilter: Subject<Event> = new Subject<Event>();

  constructor() {
  }

  ngOnInit(): void {
  }

  applyFilter($event: Event) {
    console.log($event);
    this.eventFilter.next($event);
  }
}
