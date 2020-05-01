import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMetaComponent } from './class-meta.component';

describe('ClassMetaComponent', () => {
  let component: ClassMetaComponent;
  let fixture: ComponentFixture<ClassMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
