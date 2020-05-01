import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-icon',
  templateUrl: './file-icon.component.html',
  styleUrls: ['./file-icon.component.scss'],
})
export class FileIconComponent implements OnInit {

  @Input()
  fileName: string;

  @Input()
  fileType: 'img' | 'word';

  @Input()
  /**
   * in KB
   */
  fileSize: number;

  @Input()
  source: string;

  @Input()
  isAbleDelete: boolean;

  @Output()
  fileIsDelete: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  notifyDelete() {
    this.fileIsDelete.emit(true);
  }

}
