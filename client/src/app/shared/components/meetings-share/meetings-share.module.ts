import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingViewerComponent } from './meeting-viewer/meeting-viewer.component';
import { MeetingPanelComponent } from './meeting-panel/meeting-panel.component';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MeetingInputComponent } from './meeting-input/meeting-input.component';

const component = [
  MeetingViewerComponent,
  MeetingPanelComponent,
];

@NgModule({
  declarations: [
    ...component,
    MeetingInputComponent,
  ],
  imports: [
    CommonModule,
    MaterialsModule,
  ],
  exports: [
    MeetingViewerComponent,
  ],
})
export class MeetingsShareModule {
}
