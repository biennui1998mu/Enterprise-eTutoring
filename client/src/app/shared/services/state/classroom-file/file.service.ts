import { Injectable } from '@angular/core';
import { FileStore } from './file.store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { host } from '../../../api';
import { APIResponse } from '../../../interface/API-Response';
import { of } from 'rxjs';
import { TokenService } from '../../token.service';
import { UserInterfaceService } from '../user-interface';
import { ClassroomFile } from '../../../interface/Classroom-File';

@Injectable({ providedIn: 'root' })
export class FileService {

  readonly api: string = `${host}/file`;

  constructor(
    private store: FileStore,
    private tokenService: TokenService,
    private uiStateService: UserInterfaceService,
    private http: HttpClient,
  ) {
  }

  get(classId: string) {
    this.store.setLoading(true);
    this.http.post<APIResponse<ClassroomFile[]>>(
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
          return [] as ClassroomFile[];
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.uiStateService.setError(error.message);
        this.store.reset();
        return of([] as ClassroomFile[]);
      }),
    ).subscribe(data => {
      this.store.setLoading(false);
      this.store.set(data);
    });
  }
}
