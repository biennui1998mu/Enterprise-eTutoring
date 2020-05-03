import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientGuard, StaffGuard } from './shared/guards';
import { GuestGuard } from './shared/guards/guest.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: '',
    canActivateChild: [GuestGuard],
    loadChildren: () => import('./features/guest/guest.module').then(m => m.GuestModule),
  },
  {
    path: 'client',
    canLoad: [ClientGuard],
    canActivateChild: [ClientGuard],
    loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule),
  },
  {
    path: 'staff',
    canLoad: [StaffGuard],
    canActivateChild: [StaffGuard],
    loadChildren: () => import('./features/staff/staff.module').then(m => m.StaffModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
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
