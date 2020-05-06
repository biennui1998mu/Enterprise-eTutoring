import { Injectable } from '@angular/core';
import { ScheduleStore } from './schedule.store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { host } from '../../../api';
import { TokenService } from '../../token.service';
import { UserInterfaceService } from '../user-interface';
import { APIResponse } from '../../../interface/API-Response';
import { of } from 'rxjs';
import { Schedule } from '../../../interface/Schedule';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  readonly api: string = `${host}/schedule`;

  constructor(
    private store: ScheduleStore,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
    private http: HttpClient,
  ) {
  }

  get(classId: string) {
    this.store.setLoading(true);
    this.http.post<APIResponse<Schedule[]>>(
      `${this.api}/`,
      {
        classId,
      },
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      map(response => {
        if (response.data) {
          this.uiStateService.setNotify(response.message);
          return response.data;
        } else {
          this.uiStateService.setError(response.message);
          return [] as Schedule[];
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.uiStateService.setError(error.message);
        this.store.reset();
        return of([] as Schedule[]);
      }),
    ).subscribe(data => {
      this.store.setLoading(false);
      this.store.set(data);
    });
  }
}
