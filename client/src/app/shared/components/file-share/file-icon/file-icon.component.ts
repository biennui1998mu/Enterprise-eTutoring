import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
