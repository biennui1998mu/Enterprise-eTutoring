import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassMetaComponent } from './class-meta/class-meta.component';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ClassDiscussionComponent } from './class-discussion/class-discussion.component';
import { ClassChatInputComponent } from './class-chat-input/class-chat-input.component';
import { DisscusionPillComponent } from './class-discussion/disscusion-pill/disscusion-pill.component';


@NgModule({
  declarations: [ClassMetaComponent, ClassDiscussionComponent, ClassChatInputComponent, DisscusionPillComponent],
  exports: [
    ClassMetaComponent,
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    MDBBootstrapModule,
  ],
})
export class ClassroomShareModule {
}
