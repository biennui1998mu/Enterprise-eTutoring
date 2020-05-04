import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ClientStudentStore, ClientStudentState } from './client-student.store';

@Injectable({ providedIn: 'root' })
export class ClientStudentQuery extends QueryEntity<ClientStudentState> {

  constructor(protected store: ClientStudentStore) {
    super(store);
  }

}
