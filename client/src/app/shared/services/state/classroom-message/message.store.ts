import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Message } from './message.model';

export interface MessageState extends EntityState<Message> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'message' })
export class MessageStore extends EntityStore<MessageState> {

  constructor() {
    super();
  }

}

