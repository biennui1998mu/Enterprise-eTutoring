import { Injectable } from '@angular/core';
import { ClassroomStore } from './classroom.store';
import { host } from '../../../api';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { UserInterfaceService } from '../user-interface';
import { Observable, of } from 'rxjs';
import { APIResponse } from '../../../interface/API-Response';
import { catchError, map, tap } from 'rxjs/operators';
import { Classroom } from '../../../interface/Classroom';

@Injectable({ providedIn: 'root' })
export class ClassroomService {

  private readonly api: string = `${host}/classroom`;

  constructor(
    protected store: ClassroomStore,
    private http: HttpClient,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
  ) {
  }

  get(): Observable<Classroom[]> {
    this.store.setLoading(true);
    return this.http.post<APIResponse<Classroom[]>>(
      `${this.api}/`,
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
        this.uiStateService.setError('Failed to get list user', 5);
        return of([] as Classroom[]);
      }),
    );
  }

  updateClass(classroom: Classroom<string, string, string>) {
    console.log(classroom);
    return;
    this.http.post<APIResponse<Classroom>>(
      `${this.api}/update/${classroom._id}`,
      classroom,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      // todo
    );
  }

  closeClass(classroom: Classroom<string, string, string>) {
    console.log(classroom);
    return;
    this.http.post<APIResponse<Classroom>>(
      `${this.api}/close/${classroom._id}`,
      classroom,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      // todo
    );
  }

  createClass(classroom: Classroom<string, string, string>) {
    console.log(classroom);
    return;
    this.http.post<APIResponse<Classroom>>(
      `${this.api}/create`,
      classroom,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(

    );
  }
}
