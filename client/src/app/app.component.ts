import { Component } from '@angular/core';
import { SocketService } from './shared/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eTutoring';

  constructor(
    private socketService: SocketService,
  ) {
    // setup connection and listener to the socket service:
    socketService.setupSocket();
  }

}
