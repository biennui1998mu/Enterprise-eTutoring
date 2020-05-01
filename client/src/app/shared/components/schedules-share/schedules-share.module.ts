import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleViewerComponent } from './schedule-viewer/schedule-viewer.component';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { SchedulePanelComponent } from './schedule-panel/schedule-panel.component';

const component = [
  ScheduleViewerComponent,
];

@NgModule({
  declarations: [
    ...component,
    SchedulePanelComponent,
  ],
  imports: [
    CommonModule,
    MaterialsModule,
  ],
  exports: [
    ScheduleViewerComponent,
  ],
})
export class SchedulesShareModule {
}
