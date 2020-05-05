import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from '../../../interface/User';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAction } from '../user-dialog-info/user-dialog-info.component';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableUserComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output()
  viewUserDetail: EventEmitter<User> = new EventEmitter();

  @Output()
  updateUserDetail: EventEmitter<{ action: DialogAction; user: User }> = new EventEmitter();

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  configTableColumns: ColumnMatMapper[] = columnMapper;
  mapFieldToColumn: string[] = this.configTableColumns.map(col => col.inDataField);
  expandedUserInfo: User = null;

  @Input()
  set users(users: User[]) {
    this.dataSource.data = users;
  }

  @Input('searchEvent')
  set applyFilter(event: Event) {
    if (!event) return;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  switchPage(pageEvent: PageEvent) {
    this.expandedUserInfo = null;
    this.viewUserDetail.emit(this.expandedUserInfo);
  }

  viewUser(user: User) {
    if (this.expandedUserInfo && this.expandedUserInfo._id === user._id) {
      this.expandedUserInfo = null;
    } else {
      this.expandedUserInfo = user;
    }
    this.viewUserDetail.emit(this.expandedUserInfo);
  }

  userUpdateEvent(updateEvent: { action: DialogAction; user: User }) {
    this.updateUserDetail.emit(updateEvent);
  }
}

interface ColumnMatMapper {
  inDataField: string,
  displayAs: string,
}

const columnMapper: ColumnMatMapper[] = [
  {
    inDataField: 'level',
    displayAs: 'Account Type',
  },
  {
    inDataField: 'avatar',
    displayAs: 'Avatar',
  },
  {
    inDataField: 'name',
    displayAs: 'Name',
  },
  {
    inDataField: 'username',
    displayAs: 'Email',
  },
  {
    inDataField: 'activeAt',
    displayAs: 'Last Active',
  },
  {
    inDataField: 'deletedAt',
    displayAs: 'Status',
  },
];
