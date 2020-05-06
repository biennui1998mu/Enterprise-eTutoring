import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Meeting } from '../../../interface/Meeting';

export interface MeetingState extends EntityState<Meeting>, ActiveState {
}

const initActive = {
  active: null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'meeting', idKey: '_id', resettable: true })
export class MeetingStore extends EntityStore<MeetingState> {

  constructor() {
    super(initActive);
  }

}

