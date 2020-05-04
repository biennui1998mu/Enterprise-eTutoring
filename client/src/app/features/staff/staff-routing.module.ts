import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TutorManageComponent } from './tutor-manage/tutor-manage.component';
import { StudentManageComponent } from './student-manage/student-manage.component';
import { ClassManageComponent } from './class-manage/class-manage.component';


const routes: Routes = [
  {
    path: '', component: StaffComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee', component: TutorManageComponent },
      { path: 'student', component: StudentManageComponent },
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
