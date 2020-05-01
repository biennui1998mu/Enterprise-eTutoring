import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-class-chat-input',
  templateUrl: './class-chat-input.component.html',
  styleUrls: ['./class-chat-input.component.scss'],
})
export class ClassChatInputComponent implements OnInit {

  messageInput: FormControl = new FormControl('');

  ce = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  sendChatMessage() {

  }

  getValue($event: KeyboardEvent) {
    const domInput = $event.target as HTMLDivElement;
    this.messageInput.setValue(domInput.innerText);
    console.dir(this.messageInput.value);
  }
}
