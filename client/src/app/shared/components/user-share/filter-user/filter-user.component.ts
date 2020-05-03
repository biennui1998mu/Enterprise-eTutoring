import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss'],
})
export class FilterUserComponent {

  @Output()
  eventSearchInput: EventEmitter<Event> = new EventEmitter<Event>();
  private searchInputSubject: Subject<Event> = new Subject();

  constructor() {
    this.searchInputSubject.pipe(
      distinctUntilChanged(),
      debounceTime(400),
    ).subscribe(event => {
      this.eventSearchInput.emit(event);
    });
  }

  inputChanges(event: Event) {
    this.searchInputSubject.next(event);
  }
}
