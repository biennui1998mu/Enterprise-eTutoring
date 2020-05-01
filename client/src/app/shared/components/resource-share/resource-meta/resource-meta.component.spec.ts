import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceMetaComponent } from './resource-meta.component';

describe('ResourceMetaComponent', () => {
  let component: ResourceMetaComponent;
  let fixture: ComponentFixture<ResourceMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
