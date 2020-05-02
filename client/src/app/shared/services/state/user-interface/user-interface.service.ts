import { Injectable } from '@angular/core';
import { UserInterfaceStore } from './user-interface.store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserInterfaceService {

  constructor(private userInterfaceStore: UserInterfaceStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.userInterfaceStore.update(entities)));
  }
}
