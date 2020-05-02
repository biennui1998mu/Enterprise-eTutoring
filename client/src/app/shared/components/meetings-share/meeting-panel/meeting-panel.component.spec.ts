import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPanelComponent } from './meeting-panel.component';

describe('MeetingPanelComponent', () => {
  let component: MeetingPanelComponent;
  let fixture: ComponentFixture<MeetingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
