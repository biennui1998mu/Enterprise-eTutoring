import {Injectable} from '@angular/core';
import {MeetingStore} from './meeting.store';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class MeetingService {

  constructor(private meetingStore: MeetingStore,
              private http: HttpClient) {
  }
}
