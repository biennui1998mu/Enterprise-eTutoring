import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MaterialsModule } from '../modules/materials/materials.module';
import { CoreModule } from '../modules/core/core.module';
import { LayoutModule } from './layout.module';


@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    MaterialsModule,
    CoreModule,
    LayoutModule,
  ],
})
export class AdminLayoutModule {
}
