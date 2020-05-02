import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExtendedCellComponent } from './table-extended-cell.component';

describe('TableExtendedCellComponent', () => {
  let component: TableExtendedCellComponent;
  let fixture: ComponentFixture<TableExtendedCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableExtendedCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableExtendedCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
