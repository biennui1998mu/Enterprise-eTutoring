import { Injectable } from '@angular/core';
import { ClassroomStore, ClassroomState } from './classroom.store';
import { NgEntityService } from '@datorama/akita-ng-entity-service';

@Injectable({ providedIn: 'root' })
export class ClassroomService extends NgEntityService<ClassroomState> {

  constructor(protected store: ClassroomStore) {
    super(store);
  }

}
