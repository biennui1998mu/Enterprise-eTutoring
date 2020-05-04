import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { ClassManageComponent } from './class-manage/class-manage.component';


const routes: Routes = [
  {
    path: '', component: StaffComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserManageComponent },
      { path: 'class', component: ClassManageComponent },
      { path: '', pathMatch: 'full', redirectTo: '/staff/dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {
}
