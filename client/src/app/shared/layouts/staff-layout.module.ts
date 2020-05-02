import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffLayoutComponent } from './staff-layout/staff-layout.component';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from '../modules/materials/materials.module';
import { TopNavigationComponent } from './staff-layout/top-navigation/top-navigation.component';
import { AccountMenuComponent } from './staff-layout/account-menu/account-menu.component';


@NgModule({
  declarations: [StaffLayoutComponent, TopNavigationComponent, AccountMenuComponent],
  exports: [
    StaffLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule,
  ],
})
export class StaffLayoutModule {
}
