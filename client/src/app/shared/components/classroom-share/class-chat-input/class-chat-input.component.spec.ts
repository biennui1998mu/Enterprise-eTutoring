import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassChatInputComponent } from './class-chat-input.component';

describe('ClassChatInputComponent', () => {
  let component: ClassChatInputComponent;
  let fixture: ComponentFixture<ClassChatInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassChatInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassChatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
