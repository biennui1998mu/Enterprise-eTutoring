import {Injectable} from '@angular/core';
import {MessageStore} from './message.store';
import {HttpClient} from '@angular/common/http';
import {host} from '../../../api';
import {TokenService} from '../../token.service';
import {APIResponse} from '../../../interface/API-Response';
import {Message} from '../../../interface/Message';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SOCKET_SEND_EVENT, SocketService} from '../../socket.service';

@Injectable({providedIn: 'root'})
export class MessageService {

  private readonly hostAPI = `${host}/message`;

  constructor(
    protected store: MessageStore,
    private tokenService: TokenService,
    private httpClient: HttpClient,
    private socketService: SocketService,
  ) {
    this.socketService.messageEvent.subscribe(
      message => {
        // listen live from socket event
        this.addMessage(message);
      },
    );
  }

  getAllMessage(classId: string) {
    this.httpClient.post<APIResponse<Message[]>>(
      this.hostAPI,
      {classId},
      {headers: this.tokenService.authorizeHeader},
    ).pipe(
      map(response => response.data || [] as Message[]),
      catchError(error => {
        console.error(error);
        return of([] as Message[]);
      }),
    ).subscribe(messages => {
      this.store.update(messages);
    });
  }

  addMessage(message: Message) {
    this.store.add(message);
  }

  sendMessage(message: Message) {
    return this.httpClient.post<APIResponse<Message>>(
      this.hostAPI + '/create',
      message,
      {headers: this.tokenService.authorizeHeader},
    ).pipe(
      map(response => response.data),
      tap(message => {
        if (message) {
          this.addMessage(message);
          this.socketService.socketEmit(
            SOCKET_SEND_EVENT.send_message, message,
          );
        }
      }),
      catchError(err => {
        console.error(err);
        return of(null as Message);
      }),
    );
  }
}
