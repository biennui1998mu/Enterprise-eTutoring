import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClassRoomComponent } from './class-room/class-room.component';
import { ChatRoomComponent } from './class-room/chat-room/chat-room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassroomGuard } from '../../shared/guards/classroom.guard';


const routes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'classroom/:room-id',
        canActivateChild: [ClassroomGuard],
        component: ClassRoomComponent, children: [
          { path: '', pathMatch: 'full', component: ChatRoomComponent },
        ],
      },
      { path: '', pathMatch: 'full', redirectTo: '/client/dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
