import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { LayoutsModule } from '../../shared/layouts/layouts.module';
import { ClassRoomComponent } from './class-room/class-room.component';
import { ChatRoomComponent } from './class-room/chat-room/chat-room.component';
import { ClassroomShareModule } from '../../shared/components/classroom-share/classroom-share.module';


@NgModule({
  declarations: [StudentComponent, ClassRoomComponent, ChatRoomComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    LayoutsModule,
    ClassroomShareModule,
  ],
})
export class StudentModule {
}
