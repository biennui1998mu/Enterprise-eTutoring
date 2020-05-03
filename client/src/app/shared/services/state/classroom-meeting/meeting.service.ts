import { Injectable } from '@angular/core';
import { MeetingStore } from './meeting.store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MeetingService {

  constructor(private meetingStore: MeetingStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.meetingStore.set(entities)));
  }
}
