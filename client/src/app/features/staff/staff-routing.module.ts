import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '', component: StaffComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
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
