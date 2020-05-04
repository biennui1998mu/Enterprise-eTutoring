import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../interface/User';
import {
  DialogAction,
  PopupUserInfo,
  UserDialogInfoComponent,
} from '../../user-dialog-info/user-dialog-info.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersSystemService } from '../../../../services/state/client-tutor';

@Component({
  selector: 'app-table-extended-cell',
  templateUrl: './table-extended-cell.component.html',
  styleUrls: ['./table-extended-cell.component.scss'],
})
export class TableExtendedCellComponent {
  @Input()
  user: User;

  @Output()
  userUpdate: EventEmitter<{
    action: DialogAction,
    user: User
  }> = new EventEmitter();

  constructor(
    private matDialog: MatDialog,
    private tutorService: UsersSystemService,
  ) {
  }

  editUser() {
    // TODO: mapping to API
    this.matDialog.open<UserDialogInfoComponent, PopupUserInfo, PopupUserInfo>(
      UserDialogInfoComponent, {
        height: 'max-content',
        maxHeight: '600px',
        width: '100%',
        maxWidth: '700px',
        data: {
          user: this.user,
          action: DialogAction.update,
          subject: this.user.level,
        },
      },
    ).afterClosed().subscribe(
      data => {
        if (
          (data.action === DialogAction.update || data.action === DialogAction.delete) &&
          data.user._id
        ) {
          this.tutorService.unselectActive(data.user);
          this.userUpdate.emit({
            user: data.user,
            action: data.action,
          });
        }
      },
    );
  }

  viewStatistic() {

  }
}

