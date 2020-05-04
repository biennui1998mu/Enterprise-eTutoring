import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarModel } from '../../../interface/SnackBarModel';

@Component({
  selector: 'app-info-snackbar',
  templateUrl: './info-snackbar.component.html',
  styleUrls: ['./info-snackbar.component.scss'],
})
export class InfoSnackbarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarModel,
    private snackBar: MatSnackBar,
  ) {
  }
}
