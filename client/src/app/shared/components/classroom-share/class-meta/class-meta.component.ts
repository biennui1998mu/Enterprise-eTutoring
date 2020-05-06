import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../../../interface/Classroom';

@Component({
  selector: 'app-class-meta',
  templateUrl: './class-meta.component.html',
  styleUrls: ['./class-meta.component.scss'],
})
export class ClassMetaComponent implements OnInit {

  @Input()
  classroom: Classroom;

  schedulePanelOpen = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
