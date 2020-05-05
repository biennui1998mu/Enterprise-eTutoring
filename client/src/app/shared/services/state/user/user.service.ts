import {Injectable} from '@angular/core';
import {UserStore} from './user.store';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {TokenService} from '../../token.service';
import {host} from 'src/app/shared/api';
import {APIResponse} from '../../../interface/API-Response';
import {User} from '../../../interface/User';
import {UserInterfaceService} from '../user-interface';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

  readonly api: string = `${host}/user`;

  constructor(
    private store: UserStore,
    private http: HttpClient,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
    private router: Router,
  ) {
  }

  login(formData: { username: string, password: string }) {
    return this.http.post<APIResponse<User>>(
      `${this.api}/signin`,
      formData,
    ).pipe(
      tap(response => {
        if (response.data) {
          this.store.update(response.data);
          this.tokenService.token = response.token;
        } else {
          this.store.reset();
          this.tokenService.token = null;
          this.uiStateService.setError(response.message, 5);
        }
      }),
      map(response => response.data),
    );
  }

  logout() {
    this.tokenService.clearToken();
    this.reset();
    this.router.navigateByUrl('/login');
  }

  me(): Observable<User> {
    return this.http.post<APIResponse<User>>(
      `${this.api}/view`,
      {},
      {headers: this.tokenService.authorizeHeader},
    ).pipe(
      tap(response => {
        if (response.data) {
          this.store.update(response.data);
        } else {
          this.store.reset();
          this.tokenService.token = null;
          this.uiStateService.setError(response.message, 5);
        }
      }),
      map(response => response.data),
      catchError(error => {
        return this.resolvingError<User>(
          error,
          'Retrieve user info error',
        );
      }),
    );
  }

  reset() {
    this.store.reset();
  }

  private resolvingError<T = any>(
    error: any,
    message: string = 'Unable to query',
    returnValue: T = null,
  ): Observable<T> {
    console.error(error);
    this.uiStateService.setError(message);
    return of(returnValue as T);
  }
}
