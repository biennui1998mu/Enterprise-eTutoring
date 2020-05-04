import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientTutorQuery, ClientTutorService } from '../../../shared/services/state/client-tutor';
import { User } from '../../../shared/interface/User';

@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.scss'],
})
export class StaffManageComponent implements OnInit {
  eventFilter: Subject<Event> = new Subject<Event>();

  staffs: User[] = [];

  constructor(
    private clientTutorService: ClientTutorService,
    private clientTutorQuery: ClientTutorQuery,
  ) {
    this.clientTutorQuery.selectAll().subscribe(
      staffs => this.staffs = staffs,
    );
  }

  ngOnInit(): void {
    this.clientTutorService.get().subscribe(data => {
      console.log(data);
    });
  }

  applyFilter($event: Event) {
    this.eventFilter.next($event);
  }
}
