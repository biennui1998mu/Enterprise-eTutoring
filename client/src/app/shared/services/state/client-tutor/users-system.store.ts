import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {User} from '../../../interface/User';

export interface UsersSystemState extends EntityState<User> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'users-system', resettable: true, idKey: '_id'})
export class UsersSystemStore extends EntityStore<UsersSystemState> {

  constructor() {
    super();
  }

}

