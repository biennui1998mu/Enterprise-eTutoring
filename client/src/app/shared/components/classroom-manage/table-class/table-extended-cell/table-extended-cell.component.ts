import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../../../../interface/Classroom';
import { MatDialog } from '@angular/material/dialog';
import { ResourceMetaComponent } from '../../../resource-share/resource-meta/resource-meta.component';

@Component({
  selector: 'app-table-extended-cell',
  templateUrl: './table-extended-cell.component.html',
  styleUrls: ['./table-extended-cell.component.scss'],
})
export class TableExtendedCellComponent implements OnInit {

  @Input()
  classroom: Classroom;

  constructor(
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  popupResource() {
    this.matDialog.open(
      ResourceMetaComponent, {
        width: '300px',
      },
    );
  }
}
