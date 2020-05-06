import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistic-panel',
  templateUrl: './statistic-panel.component.html',
  styleUrls: ['./statistic-panel.component.scss']
})
export class StatisticPanelComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  stats: string

  @Input()
  panelStyle: string | string[] = 'bg-primary';

  constructor() {
  }

  ngOnInit(): void {
  }

}
