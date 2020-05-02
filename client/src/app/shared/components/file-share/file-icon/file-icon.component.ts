import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KBToMB } from '../../../tools/upload.helper';

@Component({
  selector: 'app-file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss'],
})
export class FileIconComponent implements OnInit {

  @Input()
  fileName: string;

  @Input()
  fileType: string;

  @Input()
  fileExtension: string;

  @Input()
  /**
   * in KB
   */
  fileSize: number;

  @Input()
  preview: string;

  @Input()
  source: string;

  @Input()
  isAbleDelete: boolean;

  @Output()
  fileIsDelete: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  get isImage() {
    return this.fileType === 'image' &&
      this.fileExtension !== 'svg' &&
      this.preview;
  }

  ngOnInit(): void {
  }

  notifyDelete() {
    this.fileIsDelete.emit(true);
  }

  getIcon() {
    switch (this.fileType) {
      case 'Microsoft Word':
        return 'fa-files-word';
      case 'Microsoft Excel':
        return 'fa-files-excel';
      case 'Microsoft Powerpoint':
        return 'fa-files-powerpoint';
      case '7-zip archive':
      case 'ZIP archive':
      case 'RAR Archive':
        return 'fa-files-zip';
      default:
        return 'fa-question';
    }
  }

  getStyle() {
    if (this.isImage) {
      return {
        backgroundImage: `url('${this.preview}')`,
      };
    }

    return {};
  }

  getSize() {
    if (this.fileSize) {
      if (this.fileSize > 1000) {
        return `${KBToMB(this.fileSize).toFixed(2)}MB`;
      }
      return `${this.fileSize.toFixed(2)}KB`;
    }
    return '0KB';
  }
}
