import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogInfoComponent } from './user-dialog-info.component';

describe('DialogInfoComponent', () => {
  let component: UserDialogInfoComponent;
  let fixture: ComponentFixture<UserDialogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDialogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
