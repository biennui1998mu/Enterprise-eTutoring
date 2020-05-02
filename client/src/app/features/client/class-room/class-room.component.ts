import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss'],
})
export class ClassRoomComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.paramMap.subscribe(
      params => {
        console.log(params);
      },
    );
  }

  ngOnInit(): void {
  }

}
