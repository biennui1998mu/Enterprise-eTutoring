import { Component, OnInit } from '@angular/core';
import { ClassroomQuery, ClassroomService } from '../../../../shared/services/state/classroom';
import { ActivatedRoute } from '@angular/router';
import { Classroom } from '../../../../shared/interface/Classroom';
import { MessageQuery, MessageService } from '../../../../shared/services/state/classroom-message';
import { UserQuery } from '../../../../shared/services/state/user';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {

  classroomId: string = this.classroomQuery.getActiveId() as string;
  classroom: Classroom;

  messages = this.messageQuery.selectAll().pipe(tap(s => {
    console.log(s)
  }));
  messagesLoading = this.messageQuery.selectLoading();

  constructor(
    private classroomQuery: ClassroomQuery,
    private classroomService: ClassroomService,
    private messageQuery: MessageQuery,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private userQuery: UserQuery,
  ) {
    this.activatedRoute.data.subscribe(fromResolver => {
      const classResolver = fromResolver[0] as Classroom;
      if (!classResolver) {
        return;
      }
      this.classroom = classResolver;
      this.messageService.get(this.classroom._id);
    });
  }

  get me() {
    return this.userQuery.getValue();
  }

  ngOnInit(): void {
  }

}
