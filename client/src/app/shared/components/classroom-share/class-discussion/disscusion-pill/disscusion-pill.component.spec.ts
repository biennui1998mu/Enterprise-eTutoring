import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisscusionPillComponent } from './disscusion-pill.component';

describe('DisscusionPillComponent', () => {
  let component: DisscusionPillComponent;
  let fixture: ComponentFixture<DisscusionPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisscusionPillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisscusionPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
