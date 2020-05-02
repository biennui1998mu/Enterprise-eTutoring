import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffLayoutModule } from '../../shared/layouts/staff-layout.module';
import { StaffManageComponent } from './staff-manage/staff-manage.component';
import { StudentManageComponent } from './student-manage/student-manage.component';
import { ClassManageComponent } from './class-manage/class-manage.component';
import { UserShareModule } from '../../shared/components/user-share/user-share.module';
import { MaterialsModule } from '../../shared/modules/materials/materials.module';


@NgModule({
  declarations: [StaffComponent, DashboardComponent, StaffManageComponent, StudentManageComponent, ClassManageComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    StaffLayoutModule,
    UserShareModule,
    MaterialsModule,
  ],
})
export class StaffModule {
}
