import { Injectable } from '@angular/core';
import { MessageStore, MessageState } from './message.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';

@Injectable({ providedIn: 'root' })
export class MessageService extends NgEntityService<MessageState> {

  constructor(protected store: MessageStore) {
    super(store);
  }

}
