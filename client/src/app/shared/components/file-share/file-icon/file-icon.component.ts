import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ByteToKB, extractMimeInfo, KBToMB } from '../../../tools';
import { ClassroomFile } from '../../../interface/Classroom-File';
import { FileService } from '../../../services/state/classroom-file';

@Component({
  selector: 'app-file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss'],
})
export class FileIconComponent {

  @Input()
  file: ClassroomFile;

  @Input()
  isAbleDelete: boolean;

  @Output()
  fileIsDelete: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fileService: FileService,
  ) {
  }

  get isImage() {
    return extractMimeInfo(this.file.type).type === 'image';
  }

  get getIcon() {
    const mimeInfo = extractMimeInfo(this.file.type);
    switch (mimeInfo.type) {
      case 'Microsoft Word':
        return 'fa-file-word';
      case 'Microsoft Excel':
        return 'fa-file-excel';
      case 'Microsoft Powerpoint':
        return 'fa-file-powerpoint';
      case '7-zip archive':
      case 'ZIP archive':
      case 'RAR Archive':
        return 'fa-file-zip';
      default:
        return 'fa-question';
    }
  }

  get urlDownload() {
    return this.fileService.downloadFile(this.file);
  }

  get getSize() {
    const byteToKB = ByteToKB(this.file.size);
    if (byteToKB > 1000) {
      return `${KBToMB(byteToKB).toFixed(2)}MB`;
    }
    return `${byteToKB.toFixed(2)}KB`;
  }

  notifyDelete() {
    this.fileIsDelete.emit(true);
  }
}
