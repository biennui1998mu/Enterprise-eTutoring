import { Component, Input } from '@angular/core';
import { ClassroomFile } from '../../../interface/Classroom-File';
import { USER_TYPE } from '../../../interface/User';
import { Classroom } from '../../../interface/Classroom';
import { FileQuery, FileService } from '../../../services/state/classroom-file';
import { ClassroomQuery } from '../../../services/state/classroom';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-resource-meta',
  templateUrl: './resource-meta.component.html',
  styleUrls: ['./resource-meta.component.scss'],
})
export class ResourceMetaComponent {
  classroom: Classroom = this.classroomQuery.getActive();

  displayFiles: ClassroomFile[] = [];

  constructor(
    private fileService: FileService,
    private fileQuery: FileQuery,
    private classroomQuery: ClassroomQuery,
  ) {
    this.fileQuery.selectAll().subscribe(files => {
      this.files = files;
    });
    this.classroomQuery.selectActive().pipe(
      map(classrooms => {
        if (Array.isArray(classrooms)) {
          return classrooms[0] as Classroom;
        }
        return classrooms;
      }),
      tap(classroom => {
        if (classroom) {
          this.files = [];
        }
      }),
      filter(classroom => !!classroom),
    ).subscribe(classroom => {
      this.classroom = classroom;
      this.fileService.get(this.classroom._id);
    });
  }

  set files(files: ClassroomFile[]) {
    if (files) {
      this.displayFiles = files;
    } else {
      this.displayFiles = [];
    }
  }

  getFileExtension(file: ClassroomFile) {
    const fileSplit = file.name.split('.');
    return fileSplit[fileSplit.length - 1];
  }
}

export interface PopupFileInfo {
  files: ClassroomFile[];
  level: USER_TYPE
}
