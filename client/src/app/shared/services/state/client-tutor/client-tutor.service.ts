import { Injectable } from '@angular/core';
import { ClientTutorStore } from './client-tutor.store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientTutorService {

  constructor(private clientTutorStore: ClientTutorStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.clientTutorStore.set(entities)));
  }
}
