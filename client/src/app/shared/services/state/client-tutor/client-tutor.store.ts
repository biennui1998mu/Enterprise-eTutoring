import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../../../interface/User';

export interface ClientTutorState extends EntityState<User[]> {
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'client-tutor', resettable: true, idKey: '_id' })
export class ClientTutorStore extends EntityStore<ClientTutorState> {

  constructor() {
    super();
  }

}

