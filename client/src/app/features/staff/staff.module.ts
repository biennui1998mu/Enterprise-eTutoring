import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffComponent } from './staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [StaffComponent, DashboardComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
  ],
})
export class StaffModule {
}
