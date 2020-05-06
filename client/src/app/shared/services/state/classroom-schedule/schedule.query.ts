import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ScheduleStore, ScheduleState } from './schedule.store';

@Injectable({ providedIn: 'root' })
export class ScheduleQuery extends QueryEntity<ScheduleState> {

  constructor(protected store: ScheduleStore) {
    super(store);
  }

}
