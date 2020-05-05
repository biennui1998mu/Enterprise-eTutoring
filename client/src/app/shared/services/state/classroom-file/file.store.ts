import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ClassroomFile} from '../../../interface/Classroom-File';

export interface FileState extends EntityState<ClassroomFile> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'file', resettable: true, idKey: '_id'})
export class FileStore extends EntityStore<FileState> {

  constructor() {
    super();
  }

}

