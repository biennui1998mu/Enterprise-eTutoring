import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Classroom } from '../../../interface/Classroom';
import { DialogAction } from '../table-info/table-info.component';

@Component({
  selector: 'app-table-class',
  templateUrl: './table-class.component.html',
  styleUrls: ['./table-class.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class TableClassComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output()
  updateClassroomDetail: EventEmitter<{
    action: DialogAction; class: Classroom<string, string, string>
  }> = new EventEmitter();

  dataSource = new MatTableDataSource<Classroom>([]);
  configTableColumns: ColumnMatMapper[] = columnMapper;
  mapFieldToColumn: string[] = this.configTableColumns.map(
    col => col.inDataField,
  );
  expandedClassInfo: Classroom = null;

  constructor() {
  }

  @Input()
  set classrooms(classrooms: Classroom[]) {
    this.dataSource.data = classrooms;
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

  switchPage() {
    this.expandedClassInfo = null;
  }

  classroomUpdateEvent($event: { class: Classroom<string, string, string>; action: DialogAction }) {
    this.updateClassroomDetail.emit($event);
  }
}

interface ColumnMatMapper {
  inDataField: string,
  displayAs: string,
}

const columnMapper: ColumnMatMapper[] = [
  {
    inDataField: 'status',
    displayAs: 'Status',
  },
  {
    inDataField: 'title',
    displayAs: 'Title',
  },
  {
    inDataField: 'description',
    displayAs: 'Description',
  },
  {
    inDataField: 'tutor',
    displayAs: 'Tutor',
  },
  {
    inDataField: 'student',
    displayAs: 'Student',
  },
  {
    inDataField: 'createdAt',
    displayAs: 'Created at',
  },
];
