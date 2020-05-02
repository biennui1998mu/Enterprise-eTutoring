import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralLayoutComponent } from './general-layout/general-layout.component';
import { CoreModule } from '../modules/core/core.module';
import { MaterialsModule } from '../modules/materials/materials.module';


@NgModule({
  declarations: [GeneralLayoutComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialsModule,
  ],
  exports: [
    GeneralLayoutComponent,
  ],
})
export class GeneralLayoutModule {
}
