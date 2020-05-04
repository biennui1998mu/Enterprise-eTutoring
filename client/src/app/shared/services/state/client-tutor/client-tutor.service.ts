import { Injectable } from '@angular/core';
import { ClientTutorStore } from './client-tutor.store';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { host } from '../../../api';
import { TokenService } from '../../token.service';
import { UserInterfaceService } from '../user-interface';
import { Router } from '@angular/router';
import { APIResponse } from '../../../interface/API-Response';
import { User } from '../../../interface/User';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientTutorService {

  readonly api: string = `${host}/user`;

  constructor(
    private store: ClientTutorStore,
    private http: HttpClient,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
    private router: Router,
  ) {
  }

  get(): Observable<User[]> {
    return this.http.post<APIResponse<User[]>>(
      `${this.api}/tutor-list`,
      {},
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      tap(response => {
        if (response.data) {
          // set the store as the data.
          this.store.set(response.data);
        } else {
          this.store.reset();
          this.uiStateService.setError(response.message, 5);
        }
      }),
      map(response => response.data),
      catchError(err => {
        console.error(err);
        this.store.set([]);
        this.uiStateService.setError('Failed to get list tutor', 5);
        return of([] as User[]);
      }),
    );
  }

  selectActive(student: User) {
    this.store.setActive(student._id);
  }
}
