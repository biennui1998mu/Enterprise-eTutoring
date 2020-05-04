import { Injectable } from '@angular/core';
import { ClientStudentStore } from './client-student.store';
import { HttpClient } from '@angular/common/http';
import { host } from '../../../api';
import { TokenService } from '../../token.service';
import { UserInterfaceService } from '../user-interface';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { APIResponse } from '../../../interface/API-Response';
import { User } from '../../../interface/User';

@Injectable({ providedIn: 'root' })
/**
 * Only staff level above (staff/admin) can use this service.
 */
export class ClientStudentService {

  readonly api: string = `${host}/user`;

  constructor(
    private store: ClientStudentStore,
    private http: HttpClient,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
    private router: Router,
  ) {
  }

  get() {
    return this.http.post<APIResponse<User[]>>(
      `${this.api}/student-list`,
      {},
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      tap(response => {
        if (response.data) {
          this.store.update(response.data);
        } else {
          this.store.reset();
          this.uiStateService.setError(response.message, 5);
        }
      }),
      map(response => response.data),
    );
  }

  selectActive(student: User) {
    this.store.setActive(student._id);
  }
}
