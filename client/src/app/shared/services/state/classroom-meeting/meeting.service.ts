import { Injectable } from '@angular/core';
import { MeetingStore } from './meeting.store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { host } from '../../../api';
import { TokenService } from '../../token.service';
import { UserInterfaceService } from '../user-interface';
import { APIResponse } from '../../../interface/API-Response';
import { catchError, map } from 'rxjs/operators';
import { Meeting } from '../../../interface/Meeting';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MeetingService {

  readonly api: string = `${host}/meeting`;

  constructor(
    private store: MeetingStore,
    private http: HttpClient,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
  ) {
  }

  get(classId: string) {
    this.store.setLoading(true);
    this.http.post<APIResponse<Meeting[]>>(
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
          return [] as Meeting[];
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.uiStateService.setError(error.message);
        this.store.reset();
        return of([] as Meeting[]);
      }),
    ).subscribe(data => {
      this.store.setLoading(false);
      this.store.set(data);
    });
  }

  create(meeting: Partial<Meeting>) {
    this.store.setLoading(true);
    this.http.post<APIResponse<Meeting>>(
      `${this.api}/create`,
      meeting,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      map(response => {
        if (response.data) {
          this.uiStateService.setNotify(response.message);
          return response.data;
        } else {
          this.uiStateService.setError(response.message);
          return null as Meeting;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.uiStateService.setError(error.message);
        this.store.reset();
        return of(null as Meeting);
      }),
    ).subscribe(data => {
      this.store.setLoading(false);
      if (data) {
        this.store.add(data, { prepend: true });
      }
    });
  }

  update(meeting: Partial<Meeting>) {
    delete meeting.createdAt; // remove these field out of update request
    delete meeting.classroom; // remove these field out of update request
    delete meeting.createdBy; // remove these field out of update request
    this.store.setLoading(true);
    return this.http.post<APIResponse<Meeting>>(
      `${this.api}/update/${meeting._id}`,
      meeting,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      map(response => {
        this.store.setLoading(false);
        if (response.data) {
          this.uiStateService.setNotify(response.message);
          return response.data;
        } else {
          this.uiStateService.setError(response.message);
          return null as Meeting;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.store.setLoading(false);
        this.uiStateService.setError(error.message);
        this.store.reset();
        return of(null as Meeting);
      }),
    );
  }
}
