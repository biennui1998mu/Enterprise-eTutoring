import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Classroom } from './classroom.model';

export interface ClassroomState extends EntityState<Classroom> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'classroom' })
export class ClassroomStore extends EntityStore<ClassroomState> {

  constructor() {
    super();
  }

}

