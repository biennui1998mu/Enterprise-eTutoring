import { AfterViewInit, Component, Input } from '@angular/core';
import { User } from '../../../../interface/User';
import { PopupUserInfo, UserDialogInfoComponent } from '../../user-dialog-info/user-dialog-info.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-extended-cell',
  templateUrl: './table-extended-cell.component.html',
  styleUrls: ['./table-extended-cell.component.scss'],
})
export class TableExtendedCellComponent implements AfterViewInit {
  @Input()
  user: User;

  constructor(
    private matDialog: MatDialog,
  ) {
  }

  ngAfterViewInit(): void {
    this.matDialog.open<UserDialogInfoComponent, PopupUserInfo, PopupUserInfo>(
      UserDialogInfoComponent, {
        height: 'max-content',
        maxHeight: '600px',
        width: '100%',
        maxWidth: '700px',
        data: {
          user: null,
          action: 'new',
        },
      },
    ).afterClosed().subscribe(
      data => console.log(data),
    );
  }

  editUser() {
    console.log('123');
    this.matDialog.open<UserDialogInfoComponent, PopupUserInfo, PopupUserInfo>(
      UserDialogInfoComponent, {
        height: 'max-content',
        maxHeight: '600px',
        width: '100%',
        maxWidth: '700px',
        data: {
          user: null,
          action: 'update',
        },
      },
    ).afterClosed().subscribe(
      data => console.log(data),
    );
  }

  viewStatistic() {

  }
}
