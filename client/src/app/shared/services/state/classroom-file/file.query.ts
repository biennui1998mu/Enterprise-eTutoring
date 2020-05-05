import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {FileState, FileStore} from './file.store';

@Injectable({providedIn: 'root'})
export class FileQuery extends QueryEntity<FileState> {

  constructor(protected store: FileStore) {
    super(store);
  }

}
