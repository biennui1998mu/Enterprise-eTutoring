import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../interface/Message';

@Component({
  selector: 'app-discussion-pill',
  templateUrl: './discussion-pill.component.html',
  styleUrls: ['./discussion-pill.component.scss'],
})
export class DiscussionPillComponent implements OnInit {

  @Input()
  message: Message;

  constructor() {
  }

  ngOnInit(): void {
  }

}
