import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {UsersSystemState, UsersSystemStore} from './users-system.store';

@Injectable({providedIn: 'root'})
export class UsersSystemQuery extends QueryEntity<UsersSystemState> {

  constructor(protected store: UsersSystemStore) {
    super(store);
  }

}
