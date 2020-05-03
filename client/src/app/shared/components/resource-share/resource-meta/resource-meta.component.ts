import { Component, Inject, Input, OnInit } from '@angular/core';
import { ClassroomFile } from '../../../interface/Classroom-File';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { USER_TYPE } from '../../../interface/User';

@Component({
  selector: 'app-resource-meta',
  templateUrl: './resource-meta.component.html',
  styleUrls: ['./resource-meta.component.scss'],
})
export class ResourceMetaComponent implements OnInit {

  displayFiles: ClassroomFile[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PopupFileInfo,
    public dialogRef: MatDialogRef<ResourceMetaComponent>,
  ) {
    if (data?.files && this.authorized) {
      this.files = data.files;
    }
  }

  @Input()
  set files(files: ClassroomFile[]) {
    if (files) {
      this.displayFiles = files;
    } else {
      this.displayFiles = [];
    }
  }

  get authorized() {
    return this.data.level === USER_TYPE.admin ||
      this.data.level === USER_TYPE.staff;
  }

  ngOnInit(): void {
  }

}

export interface PopupFileInfo {
  files: ClassroomFile[];
  level: USER_TYPE
}
