import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {SnackBarModel} from '../../../interface/SnackBarModel';

export interface UserInterfaceState {
  errorAnnouncement: SnackBarModel;
  infoAnnouncement: SnackBarModel;
}

export function createInitialState(): UserInterfaceState {
  return {
    errorAnnouncement: null,
    infoAnnouncement: null,
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user-interface', resettable: true})
export class UserInterfaceStore extends Store<UserInterfaceState> {

  constructor() {
    super(createInitialState());
  }

}

