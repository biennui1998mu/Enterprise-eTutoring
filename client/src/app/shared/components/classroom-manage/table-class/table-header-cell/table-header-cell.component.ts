import { Component, Input, OnInit } from '@angular/core';
import { Classroom, CLASSROOM_STATUS } from '../../../../interface/Classroom';

@Component({
  selector: 'app-table-header-cell',
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss'],
})
export class TableHeaderCellComponent implements OnInit {

  @Input()
  displayField: string;

  @Input()
  classroom: Classroom;

  CLASSROOM_STATUS = CLASSROOM_STATUS;

  constructor() {
  }

  get isStatusField() {
    return this.displayField === 'status';
  }

  get statusVerbal() {
    if (this.classroom.status === CLASSROOM_STATUS.open) {
      return 'OPEN';
    }
    return 'CLOSED';
  }

  get isTutorField() {
    return this.displayField === 'tutor';
  }

  get isStudentAtField() {
    return this.displayField === 'student';
  }

  get isCreateAtField() {
    return this.displayField === 'createdAt';
  }

  get isRawField() {
    return !(
      this.isStudentAtField ||
      this.isTutorField ||
      this.isStatusField ||
      this.isCreateAtField
    );
  }

  ngOnInit(): void {
  }
}
