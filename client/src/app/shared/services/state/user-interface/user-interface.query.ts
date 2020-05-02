import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UserInterfaceStore, UserInterfaceState } from './user-interface.store';

@Injectable({ providedIn: 'root' })
export class UserInterfaceQuery extends Query<UserInterfaceState> {

  constructor(protected store: UserInterfaceStore) {
    super(store);
  }

}
