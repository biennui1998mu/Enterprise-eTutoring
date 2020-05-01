import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { ClassRoomComponent } from './class-room/class-room.component';
import { ChatRoomComponent } from './class-room/chat-room/chat-room.component';


const routes: Routes = [
  {
    path: '', component: StudentComponent, children: [
      {
        path: 'class/:room-id', component: ClassRoomComponent, children: [
          { path: '', pathMatch: 'full', component: ChatRoomComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {
}
