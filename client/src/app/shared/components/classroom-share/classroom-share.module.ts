import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassMetaComponent } from './class-meta/class-meta.component';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ClassChatInputComponent } from './class-chat-input/class-chat-input.component';
import { DiscussionPillComponent } from './disscusion-pill/discussion-pill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourceShareModule } from '../resource-share/resource-share.module';
import { SchedulesShareModule } from '../schedules-share/schedules-share.module';
import { MeetingsShareModule } from '../meetings-share/meetings-share.module';
import { FileShareModule } from '../file-share/file-share.module';
import { SharedPipeModule } from '../../pipe/shared-pipe.module';

const components = [
  ClassMetaComponent,
  ClassChatInputComponent,
  DiscussionPillComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ResourceShareModule,
    MaterialsModule,
    MDBBootstrapModule,
    SchedulesShareModule,
    MeetingsShareModule,
    FileShareModule,
    SharedPipeModule,
  ],
})
export class ClassroomShareModule {
}
