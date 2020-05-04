import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MeetingStore, MeetingState } from './meeting.store';

@Injectable({ providedIn: 'root' })
export class MeetingQuery extends QueryEntity<MeetingState> {

  constructor(protected store: MeetingStore) {
    super(store);
  }

}
