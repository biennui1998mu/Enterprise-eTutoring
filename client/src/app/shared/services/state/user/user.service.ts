import { Injectable } from '@angular/core';
import { UserStore } from './user.store';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { TokenService } from '../../token.service';
import { host } from 'src/app/shared/api';
import { APIResponse } from '../../../interface/API-Response';
import { User } from '../../../interface/User';
import { UserInterfaceService } from '../user-interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {

  readonly host: string = host;

  constructor(
    private userStore: UserStore,
    private http: HttpClient,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
    private router: Router,
  ) {
  }

  login(formData: { username: string, password: string }) {
    return this.http.post<APIResponse<User>>(
      `${host}/user/signin`,
      formData,
    ).pipe(
      tap(response => {
        if (response.data) {
          this.userStore.update(response.data);
          this.tokenService.token = response.token;
        } else {
          this.userStore.reset();
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

  reset() {
    this.userStore.reset();
  }
}
