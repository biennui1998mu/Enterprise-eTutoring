import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceMetaComponent } from './resource-meta/resource-meta.component';
import { FileShareModule } from '../file-share/file-share.module';

const components = [
  ResourceMetaComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    FileShareModule,
  ],
  exports: [
    ResourceMetaComponent,
  ],
})
export class ResourceShareModule {
}
