import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from '../../../interface/User';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  configTableColumns: ColumnMatMapper[] = columnMapper;
  mapFieldToColumn: string[] = this.configTableColumns.map(
    col => col.inDataField,
  );
  expandedUserInfo: User = mockupUser[0];

  constructor() {
    // TODO debug
    this.dataSource = new MatTableDataSource<User>(mockupUser);
  }

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
    console.log(pageEvent);
    this.expandedUserInfo = null;
  }
}

interface ColumnMatMapper {
  inDataField: string,
  displayAs: string,
}

const columnMapper: ColumnMatMapper[] = [
  {
    inDataField: 'indicator',
    displayAs: 'ID',
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
    inDataField: 'level',
    displayAs: 'Account Type',
  },
  {
    inDataField: 'activeAt',
    displayAs: 'Last Active',
  },
];

const mockupUser: User[] = [
  {
    indicator: 1,
    name: 'Hydrogen',
    username: 'hydro@gmail.com',
    avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    level: 1,
    createdAt: null,
  }, {
    indicator: 2,
    name: 'Asaka',
    username: 'Asaka_Yumi@gmail.com',
    avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    level: 2,
    createdAt: null,
  }, {
    indicator: 3,
    name: 'Son Nguyen',
    username: 'songokun@gmail.com',
    avatar: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
    level: 3,
    createdAt: null,
  },
];
