import { Component, OnInit } from '@angular/core';
import {StatisticService} from "../../../shared/services/statistic.service";
import {UserQuery} from "../../../shared/services/state/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  classroom;
  message;
  file;
  messagePerClass;
  filePerClass;

  constructor(
    private statisticService: StatisticService,
    private userQuery: UserQuery
  ) { }

  ngOnInit(): void {
    if(this.userQuery.getValue().level === 2){
      return this.tutorStatistic();
    }else{
      return this.studentStatistic();
    }
  }

  studentStatistic() {
    this.statisticService.studentStatistic().subscribe(result => {
      console.log(result);
      this.classroom = result.classroom.length;
      this.message = result.message.length;
      this.file = result.file.length;
      this.messagePerClass = (result.message.length / result.classroom.length).toFixed(2);
      this.filePerClass = (result.file.length / result.classroom.length).toFixed(2);
    });
  }

  tutorStatistic() {
    this.statisticService.tutorStatistic().subscribe(result => {
      console.log(result);
      this.classroom = result.classroom.length;
      this.message = result.message.length;
      this.file = result.file.length;
      this.messagePerClass = (result.message.length / result.classroom.length).toFixed(2);
      this.filePerClass = (result.file.length / result.classroom.length).toFixed(2);
    });
  }
}
