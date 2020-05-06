import { Component, OnInit } from '@angular/core';
import {Classroom} from "../../../shared/interface/Classroom";
import {ClassroomFile} from "../../../shared/interface/Classroom-File";
import { Message } from 'src/app/shared/interface/Message';
import {User} from "../../../shared/interface/User";
import {StatisticService} from "../../../shared/services/statistic.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalClassroom;
  totalFile;
  totalMessage;
  totalStaff;
  totalTutor;
  totalStudent;
  message7days;
  classroom7days;
  messagePerStudent;
  messagePerTutor;

  constructor(
    private statisticService: StatisticService
  ) { }

  ngOnInit(): void {
    this.staffStatistic();
  }

  staffStatistic() {
    this.statisticService.staffStatistic().subscribe(result => {
      console.log(result);
      this.totalClassroom = result.totalClassroom.length;
      this.totalMessage = result.totalMessage.length;
      this.totalFile = result.totalFile.length;
      this.totalStaff = result.totalStaff.length;
      this.totalTutor = result.totalTutor.length;
      this.totalStudent = result.totalStudent.length;
      this.message7days = result.message7days.length;
      this.classroom7days = result.classroom7days.length;
      this.messagePerStudent = result.totalMessage.length / result.totalStudent.length;
      this.messagePerTutor = result.totalMessage.length / result.totalTutor.length;
    });
  }
}
