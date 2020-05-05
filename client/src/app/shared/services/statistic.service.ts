import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {map} from "rxjs/operators";
import {APIResponse} from "../interface/API-Response";
import {Classroom} from '../interface/Classroom';
import {ClassroomFile} from "../interface/Classroom-File";
import {Message} from "../interface/Message";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  statistic() {
    return this.http.post<APIResponse<{
      classroom: Classroom[],
      file: ClassroomFile[],
      message: Message[]
    }>>(
      `${this.url}/statistic/all`,
      {},
      {headers: this.tokenService.authorizeHeader}
    ).pipe(
      map(result => {
        if (result) {
          return result.data;
        } else {
          return {
            classroom: [],
            file: [],
            message: []
          };
        }
      })
    );
  }
}
