import {Component, OnInit} from '@angular/core';
import {StatisticService} from "src/app/shared/services/statistic.service";
import {Classroom} from "src/app/shared/interface/Classroom";
import {Message} from "src/app/shared/interface/Message";
import {ClassroomFile} from 'src/app/shared/interface/Classroom-File';

@Component({
  selector: 'app-statistic-panel',
  templateUrl: './statistic-panel.component.html',
  styleUrls: ['./statistic-panel.component.scss']
})
export class StatisticPanelComponent implements OnInit {

  classroom: Classroom[] = [];
  file: ClassroomFile[] = [];
  message: Message[] = [];

  constructor(
    private statisticService: StatisticService
  ) {
  }

  ngOnInit(): void {
    this.statistic();
  }

  statistic() {
    this.statisticService.statistic().subscribe(result => {
      console.log(result);
      this.classroom = result.classroom;
      this.message = result.message;
      this.file = result.file;
    });
  }
}
