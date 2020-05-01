import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDiscussionComponent } from './class-discussion.component';

describe('ClassDiscussionComponent', () => {
  let component: ClassDiscussionComponent;
  let fixture: ComponentFixture<ClassDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
