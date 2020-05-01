import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../../shared/modules/core/core.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    GuestRoutingModule,
    MDBBootstrapModule,
  ],
})
export class GuestModule {
}
