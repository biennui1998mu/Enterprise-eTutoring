import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { GeneralLayoutModule } from '../../shared/layouts/general-layout.module';
import { ClassRoomComponent } from './class-room/class-room.component';
import { ChatRoomComponent } from './class-room/chat-room/chat-room.component';
import { ClassroomShareModule } from '../../shared/components/classroom-share/classroom-share.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [ClientComponent, ClassRoomComponent, ChatRoomComponent, DashboardComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GeneralLayoutModule,
    ClassroomShareModule,
  ],
})
export class ClientModule {
}
