import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../modules/core/core.module';
import { MaterialsModule } from '../../modules/materials/materials.module';
import { SharedPipeModule } from '../../pipe/shared-pipe.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UserSearchComponent } from './user-search/user-search.component';

const components = [
  UserSearchComponent,
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
    SharedPipeModule,
  ],
  exports: [
    ...components,
  ],
})
export class UserGeneralModule {
}
