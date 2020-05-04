import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticPanelComponent } from './statistic-panel/statistic-panel.component';

const component = [
  StatisticPanelComponent,
];

@NgModule({
  declarations: [
    ...component,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...component,
  ],
})
export class StatisticsModule {
}
