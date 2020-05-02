import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface UserInterfaceState {
  key: string;
}

export function createInitialState(): UserInterfaceState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user-interface' })
export class UserInterfaceStore extends Store<UserInterfaceState> {

  constructor() {
    super(createInitialState());
  }

}

