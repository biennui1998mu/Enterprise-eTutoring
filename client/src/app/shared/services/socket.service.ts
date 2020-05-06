import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {TokenService} from './token.service';
import {host} from '../api';
import {BehaviorSubject, Subject} from 'rxjs';
import {Message} from '../interface/Message';
import {Classroom} from '../interface/Classroom';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly hostApi = host;
  private readonly _socket: SocketIOClient.Socket;

  private _classroomEvent: BehaviorSubject<Classroom> = new BehaviorSubject(null);
  public classroomEvent = this._classroomEvent.asObservable();

  private _messageEvent: Subject<Message> = new Subject();
  public messageEvent = this._messageEvent.asObservable();

  constructor(
    private tokenService: TokenService,
  ) {
    this._socket = io(this.hostApi, {
      query: {
        token: this.tokenService.authorizeHeader,
      },
    });
  }

  get socket() {
    return this._socket;
  }

  setupSocket() {
    this.messageEventListener();
  }

  public socketEmit<T = Classroom | Message>(event: SOCKET_SEND_EVENT, data: T) {
    this.socket.emit(event, data);
  }

  private messageEventListener() {
    const _ = this;
    this.socket.on(
      SOCKET_RECEIVE_EVENT.receive_message,
      function (message: Message) {
        // user receive message
        console.log(message);
        _._messageEvent.next(message);
      });
  }
}

/**
 * ensure both server/client have the same event mapping like below
 * these are events that server will emit to client
 */
export enum SOCKET_RECEIVE_EVENT {
  receive_message = 'server-send-message'
}

/**
 * ensure both server/client have the same event mapping like below
 * these are events that client will emit to server
 */
export enum SOCKET_SEND_EVENT {
  join_room_chat = 'user-join-room-chat',
  send_message = 'user-send-message',
}
