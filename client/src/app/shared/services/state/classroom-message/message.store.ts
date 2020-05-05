import {Injectable} from '@angular/core';
import {ActiveState, EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Message} from '../../../interface/Message';

export interface MessageState extends EntityState<Message>, ActiveState {
}

const initialState = {
  active: null,
};

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'message', resettable: true, idKey: '_id'})
export class MessageStore extends EntityStore<MessageState> {

  constructor() {
    super(initialState);
  }

}

