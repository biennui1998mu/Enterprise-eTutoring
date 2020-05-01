import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileIconComponent } from './file-icon/file-icon.component';
import { MaterialsModule } from '../../modules/materials/materials.module';

const components = [
  FileIconComponent,
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
    MaterialsModule,
  ],
})
export class FileShareModule {
}
