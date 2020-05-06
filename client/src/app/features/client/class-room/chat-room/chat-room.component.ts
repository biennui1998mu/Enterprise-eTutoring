import { Component, OnInit } from '@angular/core';
import { ClassroomQuery, ClassroomService } from '../../../../shared/services/state/classroom';
import { ActivatedRoute } from '@angular/router';
import { Classroom } from '../../../../shared/interface/Classroom';
import { MessageQuery } from '../../../../shared/services/state/classroom-message';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {

  classroomId: string = this.classroomQuery.getActiveId() as string;
  classroom: Classroom;

  messages = this.messageQuery.selectAll();
  messagesLoading = this.messageQuery.selectLoading();

  constructor(
    private classroomQuery: ClassroomQuery,
    private classroomService: ClassroomService,
    private messageQuery: MessageQuery,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.subscribe(fromResolver => {
      const classResolver = fromResolver[0] as Classroom;
      if (!classResolver) {
        return;
      }
      this.classroom = classResolver;
      console.log(this.classroom);
    });
  }

  ngOnInit(): void {
  }

}
