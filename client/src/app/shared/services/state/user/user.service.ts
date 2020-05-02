import { Injectable } from '@angular/core';
import { UserStore } from './user.store';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TokenService } from '../../token.service';
import { host } from 'src/app/shared/api';

@Injectable({ providedIn: 'root' })
export class UserService {

  readonly host: string = host;

  constructor(
    private userStore: UserStore,
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  login(formData: { username: string, password: string }) {
    return this.http.post(
      `${host}/user/signin`,
      formData,
    ).pipe(
      tap(entities => {
        console.log(entities);
      }),
    );
  }


}
