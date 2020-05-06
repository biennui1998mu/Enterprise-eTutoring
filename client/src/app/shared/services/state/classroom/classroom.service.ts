import { Injectable } from '@angular/core';
import { ClassroomStore } from './classroom.store';
import { host } from '../../../api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../../token.service';
import { UserInterfaceService } from '../user-interface';
import { Observable, of } from 'rxjs';
import { APIResponse } from '../../../interface/API-Response';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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

  getOne(id: string): Observable<Classroom> {
    return this.http.post<APIResponse<Classroom>>(
      `${this.api}/view`,
      { _id: id },
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      map(response => {
        if (response.data) {
          this.uiStateService.setNotify(response.message);
        } else {
          this.uiStateService.setError(response.message);
        }
        return response.data;
      }),
      catchError(error => {
        console.error(error);
        this.uiStateService.setError(error.message);
        return of(null as Classroom);
      }),
    );
  }

  updateClass(classroom: Classroom<string, string, string>) {
    this.http.post<APIResponse<Classroom>>(
      `${this.api}/update/${classroom._id}`,
      classroom,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      switchMap(res => {
        if (res.data) {
          this.uiStateService.setNotify(res.message);
          return this.get();
        } else {
          this.uiStateService.setError(res.message);
          return of([] as Classroom[]);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.uiStateService.setError(error.message);
        return of([] as Classroom[]);
      }),
    ).subscribe(res => res);
  }

  changeStatusClass(classroom: Classroom<string, string, string>) {
    this.http.post<APIResponse<Classroom>>(
      `${this.api}/status/${classroom._id}`,
      classroom,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      switchMap(res => {
        if (res.data) {
          this.uiStateService.setNotify(res.message);
          return this.get();
        } else {
          this.uiStateService.setError(res.message);
          return of([] as Classroom[]);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.uiStateService.setError(error.message);
        return of([] as Classroom[]);
      }),
    ).subscribe(res => res);
  }

  createClass(classroom: Classroom<string, string, string>) {
    this.http.post<APIResponse<Classroom>>(
      `${this.api}/create`,
      classroom,
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.uiStateService.setError(error.message);
        return of({
          data: null,
          message: error.message,
        });
      }),
    ).subscribe(res => {
      if (res.data) {
        this.store.add(res.data);
        this.uiStateService.setNotify(res.message);
      } else {
        this.uiStateService.setError(res.message);
      }
    });
  }

  setActiveClass(classroom: Classroom) {
    this.store.setActive(classroom._id);
  }

  removeActiveClass(classroom: Classroom) {
    this.store.removeActive(classroom._id);
  }
}
