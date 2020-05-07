import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    canActivateChild: [ClientGuard],
    loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule),
  },
  {
    path: 'staff',
    canActivateChild: [StaffGuard],
    loadChildren: () => import('./features/staff/staff.module').then(m => m.StaffModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
