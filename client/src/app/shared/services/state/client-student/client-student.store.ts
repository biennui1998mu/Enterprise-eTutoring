import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../../../interface/User';

export interface ClientStudentState extends EntityState<User>, ActiveState {
}

const initialState = {
  active: null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'client-student', resettable: true, idKey: '_id' })
export class ClientStudentStore extends EntityStore<ClientStudentState> {

  constructor() {
    super(initialState);
  }

}

