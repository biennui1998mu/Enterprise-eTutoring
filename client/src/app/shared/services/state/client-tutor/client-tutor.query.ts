import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ClientTutorStore, ClientTutorState } from './client-tutor.store';

@Injectable({ providedIn: 'root' })
export class ClientTutorQuery extends QueryEntity<ClientTutorState> {

  constructor(protected store: ClientTutorStore) {
    super(store);
  }

}
