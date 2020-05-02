import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingViewerComponent } from './meeting-viewer.component';

describe('MeetingViewerComponent', () => {
  let component: MeetingViewerComponent;
  let fixture: ComponentFixture<MeetingViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
