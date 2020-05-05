import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ClassroomState, ClassroomStore} from './classroom.store';

@Injectable({providedIn: 'root'})
export class ClassroomQuery extends QueryEntity<ClassroomState> {

  constructor(protected store: ClassroomStore) {
    super(store);
  }

}
