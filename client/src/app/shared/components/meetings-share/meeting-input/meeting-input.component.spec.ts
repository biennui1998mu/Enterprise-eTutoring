import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingInputComponent } from './meeting-input.component';

describe('MeetingInputComponent', () => {
  let component: MeetingInputComponent;
  let fixture: ComponentFixture<MeetingInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
