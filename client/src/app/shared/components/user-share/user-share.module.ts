import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableUserComponent } from './table-user/table-user.component';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { CoreModule } from '../../modules/core/core.module';
import { FilterUserComponent } from './filter-user/filter-user.component';
import { MatTableModule } from '@angular/material/table';
import { TableExtendedCellComponent } from './table-user/table-extended-cell/table-extended-cell.component';
import { TableHeaderCellComponent } from './table-user/table-header-cell/table-header-cell.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserDialogInfoComponent } from './user-dialog-info/user-dialog-info.component';

const components = [
  TableUserComponent,
  FilterUserComponent,
  TableExtendedCellComponent,
  TableHeaderCellComponent,
  UserDialogInfoComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [
    ...components,
  ],
})
export class UserShareModule {
}
