import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { CoreModule } from '../modules/core/core.module';
import { MaterialsModule } from '../modules/materials/materials.module';


@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialsModule,
  ],
  exports: [
    GeneralComponent,
  ],
})
export class LayoutsModule {
}
