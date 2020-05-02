import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from '../../../interface/User';

export function createInitialState(): User {
  return {
    _id: null,
    indicator: null,
    username: null,
    name: null,
    avatar: null,
    level: null,
    updatedAt: null,
    createdAt: null,
    activeAt: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user', resettable: true })
export class UserStore extends Store<User> {

  constructor() {
    super(createInitialState());
  }

}

