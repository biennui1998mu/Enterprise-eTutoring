import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: '',
    loadChildren: () => import('./features/guest/guest.module').then(m => m.GuestModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule),
  },
  {
    path: 'staff',
    loadChildren: () => import('./features/staff/staff.module').then(m => m.StaffModule),
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
