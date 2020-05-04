import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UsersSystemQuery, UsersSystemService } from '../../../shared/services/state/client-tutor';
import { User, USER_TYPE } from '../../../shared/interface/User';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogAction,
  PopupUserInfo,
  UserDialogInfoComponent,
} from '../../../shared/components/user-share/user-dialog-info/user-dialog-info.component';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  eventFilter: Subject<Event> = new Subject<Event>();

  users: Observable<User[]> = this.query.selectAll();
  isUsersLoading = this.query.selectLoading();

  USER_TYPE = USER_TYPE;

  constructor(
    private service: UsersSystemService,
    private query: UsersSystemQuery,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.service.get().subscribe();
  }

  applyFilter($event: Event) {
    this.eventFilter.next($event);
  }

  selectedUser(user: User) {
    this.service.selectActive(user);
  }

  newUserDialog(
    level: USER_TYPE = USER_TYPE.tutor,
  ) {
    // const activeState = this.query.getActive();
    // let user: User;
    // if (Array.isArray(activeState)) {
    //   user = activeState[0];
    // } else {
    //   user = activeState;
    // }
    this.matDialog.open<UserDialogInfoComponent, PopupUserInfo, PopupUserInfo>(
      UserDialogInfoComponent, {
        height: 'max-content',
        maxHeight: '600px',
        width: '100%',
        maxWidth: '700px',
        data: { user: null, action: DialogAction.new, subject: level },
      },
    ).afterClosed().subscribe(
      data => {
        if (!data || data.action === DialogAction.cancel) {
          return;
        }
        if (data.action === DialogAction.new && data.user) {
          this.service.createUser(data.user);
        }
      },
    );
  }

  updateUserInfo(updateEvent: { user: User, action: DialogAction }) {
    if (updateEvent.action === DialogAction.delete) {
      this.service.deleteUser(updateEvent.user);
    } else if (updateEvent.action === DialogAction.update) {
      this.service.updateUser(updateEvent.user);
    }
  }
}
