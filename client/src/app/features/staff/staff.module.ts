import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffLayoutModule } from '../../shared/layouts/staff-layout.module';
import { UserManageComponent } from './user-manage/user-manage.component';
import { ClassManageComponent } from './class-manage/class-manage.component';
import { UserShareModule } from '../../shared/components/user-share/user-share.module';
import { MaterialsModule } from '../../shared/modules/materials/materials.module';
import { ClassroomManageModule } from '../../shared/components/classroom-manage/classroom-manage.module';
import { ScheduleManageComponent } from './schedule-manage/schedule-manage.component';
import { StatisticsModule } from "../../shared/components/statistics/statistics.module";


@NgModule({
  declarations: [StaffComponent, DashboardComponent, UserManageComponent, ClassManageComponent, ScheduleManageComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    StaffLayoutModule,
    UserShareModule,
    MaterialsModule,
    ClassroomManageModule,
    StatisticsModule,
  ],
})
export class StaffModule {
}
