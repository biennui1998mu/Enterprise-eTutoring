import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interface/User';

@Component({
  selector: 'app-table-extended-cell',
  templateUrl: './table-extended-cell.component.html',
  styleUrls: ['./table-extended-cell.component.scss'],
})
export class TableExtendedCellComponent implements OnInit {
  @Input()
  user: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
