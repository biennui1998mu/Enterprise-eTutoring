import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { map } from 'rxjs/operators';
import { APIResponse } from '../interface/API-Response';
import { Classroom } from '../interface/Classroom';
import { ClassroomFile } from '../interface/Classroom-File';
import { Message } from '../interface/Message';
import { User } from '../interface/User';
import { host } from '../api';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {

  readonly api: string = `${host}/statistic`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  staffStatistic() {
    return this.http.post<APIResponse<{
      totalClassroom: Classroom[],
      totalFile: ClassroomFile[],
      totalMessage: Message[],
      totalStaff: User[],
      totalTutor: User[],
      totalStudent: User[],
      message7days: Message[],
      classroom7days: Classroom[]
    }>>(
      `${this.api}/staff`,
      {},
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      map(result => {
        if (result) {
          return result.data;
        } else {
          return {
            totalClassroom: [],
            totalFile: [],
            totalMessage: [],
            totalStaff: [],
            totalTutor: [],
            totalStudent: [],
            message7days: [],
            classroom7days: [],
          };
        }
      }),
    );
  }

  tutorStatistic() {
    return this.http.post<APIResponse<{
      classroom: Classroom[],
      message: Message[],
      file: ClassroomFile[]
    }>>(
      `${this.api}/tutor`,
      {},
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      map(result => {
        if (result) {
          return result.data;
        } else {
          return {
            classroom: [],
            file: [],
            message: [],
          };
        }
      }),
    );
  }

  studentStatistic() {
    return this.http.post<APIResponse<{
      classroom: Classroom[],
      message: Message[],
      file: ClassroomFile[]
    }>>(
      `${this.api}/student`,
      {},
      { headers: this.tokenService.authorizeHeader },
    ).pipe(
      map(result => {
        if (result) {
          return result.data;
        } else {
          return {
            classroom: [],
            file: [],
            message: [],
          };
        }
      }),
    );
  }
}
