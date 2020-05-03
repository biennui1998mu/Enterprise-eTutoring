import { Injectable } from '@angular/core';
import { FileStore } from './file.store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private fileStore: FileStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.fileStore.set(entities)));
  }
}
