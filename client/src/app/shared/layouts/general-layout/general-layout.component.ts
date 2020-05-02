import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.scss'],
})
export class GeneralLayoutComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
