import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ClientTutorQuery, ClientTutorService } from '../../../shared/services/state/client-tutor';
import { User, USER_TYPE } from '../../../shared/interface/User';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogAction,
  PopupUserInfo,
  UserDialogInfoComponent,
} from '../../../shared/components/user-share/user-dialog-info/user-dialog-info.component';

@Component({
  selector: 'app-tutor-manage',
  templateUrl: './tutor-manage.component.html',
  styleUrls: ['./tutor-manage.component.scss'],
})
export class TutorManageComponent implements OnInit {
  eventFilter: Subject<Event> = new Subject<Event>();

  staffs: Observable<User[]> = this.query.selectAll();
  isStaffLoading = this.query.selectLoading();

  constructor(
    private service: ClientTutorService,
    private query: ClientTutorQuery,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.service.get().subscribe(data => {
      console.log(data);
    });
  }

  applyFilter($event: Event) {
    this.eventFilter.next($event);
  }

  selectedUser(user: User) {
    this.service.selectActive(user);
  }

  newTutorDialog() {
    const activeState = this.query.getActive();
    let user: User;
    if (Array.isArray(activeState)) {
      user = activeState[0];
    } else {
      user = activeState;
    }
    this.matDialog.open<UserDialogInfoComponent, PopupUserInfo, PopupUserInfo>(
      UserDialogInfoComponent, {
        height: 'max-content',
        maxHeight: '600px',
        width: '100%',
        maxWidth: '700px',
        data: { user: user, action: DialogAction.new, subject: USER_TYPE.tutor },
      },
    ).afterClosed().subscribe(
      data => {
        if (data.action === DialogAction.cancel) {
          return;
        }
        if (
          data.action === DialogAction.new &&
          data.subject === USER_TYPE.tutor &&
          data.user
        ) {
          this.service.createTutor(data.user);
        }
      },
    );
  }

  updateTutorInfo(updateEvent: { user: User, action: DialogAction }) {
    console.log(updateEvent);
  }
}
