import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Schedule } from '../../../interface/Schedule';

export interface ScheduleState extends EntityState<Schedule>, ActiveState {
}

const initState = {
  active: null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'schedule', resettable: true, idKey: '_id' })
export class ScheduleStore extends EntityStore<ScheduleState> {

  constructor() {
    super(initState);
  }

}

