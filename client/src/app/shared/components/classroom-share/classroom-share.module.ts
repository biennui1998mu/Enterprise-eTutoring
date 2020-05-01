import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassMetaComponent } from './class-meta/class-meta.component';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ClassChatInputComponent } from './class-chat-input/class-chat-input.component';
import { DisscusionPillComponent } from './disscusion-pill/disscusion-pill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourceShareModule } from '../resource-share/resource-share.module';

const components = [
  ClassMetaComponent,
  ClassChatInputComponent,
  DisscusionPillComponent,
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
  ],
})
export class ClassroomShareModule {
}
