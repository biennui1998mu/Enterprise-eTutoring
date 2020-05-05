import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Classroom} from '../../../interface/Classroom';

export interface ClassroomState extends EntityState<Classroom> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'classroom', resettable: true, idKey: '_id'})
export class ClassroomStore extends EntityStore<ClassroomState> {

  constructor() {
    super();
  }

}

