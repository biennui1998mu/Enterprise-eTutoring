import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interface/User';

@Component({
  selector: 'app-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss'],
})
export class TableHeaderCellComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  displayField: string;

  constructor() {
  }

  get isAvatarField() {
    return this.displayField === 'avatar';
  }

  get isLevelField() {
    return this.displayField === 'level';
  }

  get isActiveAtField() {
    return this.displayField === 'activeAt';
  }

  get isRawField() {
    return !(this.isAvatarField || this.isLevelField || this.isActiveAtField);
  }

  get userLevel() {
    switch (this.user?.level) {
      case 0:
        return 'Admin';
      case 1:
        return 'Staff';
      case 2:
        return 'Tutor';
      default:
        return 'Student';
    }
  }

  ngOnInit(): void {
  }

}
