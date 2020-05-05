import {Injectable} from '@angular/core';
import {UsersSystemStore} from './users-system.store';
import {HttpClient} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {host} from '../../../api';
import {TokenService} from '../../token.service';
import {UserInterfaceService} from '../user-interface';
import {APIResponse} from '../../../interface/API-Response';
import {User} from '../../../interface/User';
import {Observable, of} from 'rxjs';
import {UsersSystemQuery} from './users-system.query';
import {extractInfo} from '../../../tools';

@Injectable({providedIn: 'root'})
export class UsersSystemService {

  private readonly api: string = `${host}/user`;

  constructor(
    private store: UsersSystemStore,
    private query: UsersSystemQuery,
    private http: HttpClient,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
  ) {
  }

  get(): Observable<User[]> {
    this.store.setLoading(true);
    return this.http.post<APIResponse<User[]>>(
      `${this.api}/list`,
      {},
      {headers: this.tokenService.authorizeHeader},
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
        this.uiStateService.setError('Failed to get list user', 5);
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
    if (this.query.hasActive(student._id)) {
      this.store.removeActive(student._id);
    }
  }

  createUser(user: User) {
    const formData = this.generateFormData(user);
    // set the store state (loading screen etc...)
    this.store.setLoading(true);
    this.http.post<APIResponse<User>>(
      `${this.api}/signup`,
      formData,
      {headers: this.tokenService.authorizeHeader},
    ).pipe(
      tap(() => {
        // finish loading once tap trigger / finish API request
        this.store.setLoading(false);
      }),
      // only care about the data, f*ck response message
      map(res => res.data),
      catchError(error => {
        console.error(error);
        /// display error 5 second if the request error
        this.uiStateService.setError('Failed to create the user', 5);
        return of(null as User);
      }),
    ).subscribe(newUser => {
      if (newUser) {
        // add the new user to the array
        this.store.add(newUser);
      }
    });
  }

  updateUser(user: User) {
    const formData = this.generateFormData(user);
    const authorizeHeader = this.tokenService.authorizeHeader;
    // set the store state (loading screen etc...)
    this.store.setLoading(true);
    this.http.post<APIResponse<User>>(
      `${this.api}/update`,
      formData,
      {
        headers: authorizeHeader,
      },
    ).pipe(
      tap((res) => {
        if (res.error) {
          this.uiStateService.setError(
            res.error.message ? res.error.message : 'Failed to update the user',
            5,
          );
        }
        // finish loading once tap trigger / finish API request
        this.store.setLoading(false);
      }),
      // only care about the data, f*ck response message
      map(res => res.data),
      switchMap(() => this.get()),
      catchError(error => {
        console.error(error);
        /// display error 5 second if the request error
        this.uiStateService.setError('Failed to update the user', 5);
        return of([] as User[]);
      }),
    ).subscribe();
  }

  deleteUser(user: User) {
    this.store.setLoading(true);
    this.http.post<APIResponse<User>>(
      `${this.api}/delete/${user._id}`,
      {},
      {headers: this.tokenService.authorizeHeader},
    ).pipe(
      tap(() => {
        // finish loading once tap trigger / finish API request
        this.store.setLoading(false);
      }),
      // only care about the data, f*ck response message
      map(res => res.data),
      switchMap(() => this.get()),
      catchError(error => {
        console.error(error);
        /// display error 5 second if the request error
        this.uiStateService.setError('Failed to delete the user', 5);
        return of([] as User[]);
      }),
    ).subscribe();
  }

  private generateFormData(userUpdate: User) {
    const formData = new FormData();
    Object.keys(userUpdate).forEach(field => {
      if (field !== 'indicator') {
        // create formData based on user available field
        if (field === 'avatar' || field === 'avatarNew') {
          // TODO resolve later
          if (field === 'avatarNew') {
            const fileInfo = extractInfo(userUpdate.avatarNew);
            if (fileInfo) {
              formData.append('avatar', fileInfo.selfInstance, fileInfo.filename);
            }
          }
        } else if (!!userUpdate[field]) {
          // only passing the data that is not null/empty to the form
          let data = userUpdate[field];
          // must stringify the data first
          if (typeof data !== 'string') {
            data = JSON.stringify(data);
          }
          formData.append(field, data);
        }
      }
    });
    return formData;
  }
}
