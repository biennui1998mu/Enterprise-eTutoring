import { Injectable } from '@angular/core';
import { UsersSystemStore } from './users-system.store';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { host } from '../../../api';
import { TokenService } from '../../token.service';
import { UserInterfaceService } from '../user-interface';
import { Router } from '@angular/router';
import { APIResponse } from '../../../interface/API-Response';
import { User } from '../../../interface/User';
import { Observable, of } from 'rxjs';
import { UsersSystemQuery } from './users-system.query';

@Injectable({ providedIn: 'root' })
export class UsersSystemService {

  readonly api: string = `${host}/user`;

  constructor(
    private store: UsersSystemStore,
    private query: UsersSystemQuery,
    private http: HttpClient,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
    private router: Router,
  ) {
  }

  get(): Observable<User[]> {
    this.store.setLoading(true);
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
        this.store.setLoading(false);
      }),
      map(response => response.data),
      catchError(err => {
        console.error(err);
        this.store.setLoading(false);
        this.store.set([]);
        this.uiStateService.setError('Failed to get list tutor', 5);
        return of([] as User[]);
      }),
    );
  }

  selectActive(student: User) {
    if (!student) {
      this.store.setActive(null);
      return;
    }
    this.store.setActive(student._id);
  }

  unselectActive(student: User) {
    if (!student) {
      return;
    }
    this.store.removeActive(student._id);
  }

  createUser(user: User) {
    const formData = new FormData();
    Object.keys(user).forEach(field => {
      if (field === 'avatar' || field === 'avatarNew') {
        // TODO resolve later
      } else if (!!user[field]) {
        let data = user[field];
        if (typeof data !== 'string') {
          data = JSON.stringify(data);
        }
        formData.append(field, data);
      }
    });
    this.store.setLoading(true);
    this.http.post<APIResponse<User>>(
      `${this.api}/signup`,
      formData,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      tap(() => {
        this.store.setLoading(false);
      }),
      map(res => res.data),
      catchError(error => {
        console.error(error);
        this.uiStateService.setError('Failed to create the user', 5);
        return of(null as User);
      }),
    ).subscribe(newUser => {
      if (newUser) {
        this.store.add(newUser);
      }
    });
  }

  updateUser(tutor: User) {
    // todo update the state
  }

  deleteUser(tutor: User) {
    // todo delete the user and update the state
  }
}
