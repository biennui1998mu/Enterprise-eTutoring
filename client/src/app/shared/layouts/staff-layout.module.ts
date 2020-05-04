import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffLayoutComponent } from './staff-layout/staff-layout.component';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from '../modules/materials/materials.module';
import { AccountMenuComponent } from './staff-layout/account-menu/account-menu.component';
import { LayoutModule } from './layout.module';


@NgModule({
  declarations: [StaffLayoutComponent, AccountMenuComponent],
  exports: [
    StaffLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule,
    LayoutModule,
  ],
})
export class StaffLayoutModule {
}
