import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSnackbarComponent } from './info-snackbar/info-snackbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const components = [
  InfoSnackbarComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ...components,
  ],
})
export class StackBarModule {
}
