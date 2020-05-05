import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableClassComponent } from './table-class/table-class.component';
import { FilterClassComponent } from './filter-class/filter-class.component';
import { TableExtendedCellComponent } from './table-class/table-extended-cell/table-extended-cell.component';
import { TableHeaderCellComponent } from './table-class/table-header-cell/table-header-cell.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedPipeModule } from '../../pipe/shared-pipe.module';
import { MatListModule } from '@angular/material/list';
import { SchedulesShareModule } from '../schedules-share/schedules-share.module';
import { MatButtonModule } from '@angular/material/button';
import { TableInfoComponent } from './table-info/table-info.component';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { CoreModule } from '../../modules/core/core.module';
import { UserGeneralModule } from '../user-general/user-general.module';


@NgModule({
  declarations: [
    TableClassComponent,
    FilterClassComponent,
    TableExtendedCellComponent,
    TableHeaderCellComponent,
    TableInfoComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    SharedPipeModule,
    MatListModule,
    SchedulesShareModule,
    MatButtonModule,
    MaterialsModule,
    CoreModule,
    UserGeneralModule,
  ],
  exports: [
    TableClassComponent,
    FilterClassComponent,
  ],
})
export class ClassroomManageModule {
}
