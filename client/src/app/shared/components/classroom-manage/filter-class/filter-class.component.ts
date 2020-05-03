import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-class',
  templateUrl: './filter-class.component.html',
  styleUrls: ['./filter-class.component.scss'],
})
export class FilterClassComponent implements OnInit {

  @Output()
  eventSearchInput: EventEmitter<Event> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
