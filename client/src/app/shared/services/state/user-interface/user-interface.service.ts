import { Injectable } from '@angular/core';
import { UserInterfaceStore } from './user-interface.store';
import { SnackBarModel } from '../../../interface/SnackBarModel';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserInterfaceQuery } from './user-interface.query';

@Injectable({ providedIn: 'root' })
export class UserInterfaceService {

  constructor(
    private store: UserInterfaceStore,
    private query: UserInterfaceQuery,
    private matSnackBar: MatSnackBar,
  ) {
    query.select().subscribe(state => {
      if (state.errorAnnouncement) {
        this.openErrorSnackBar();
      } else if (state.infoAnnouncement) {
        // TODO openInfoSnackBar
        this.openInfoSnackBar();
      }
    });
  }

  /**
   * display error dialog
   * @param message
   * @param timeout second
   */
  setError(message: string, timeout?: number) {
    const errorInstance: SnackBarModel = { message, timeout };
    this.store.update({
      errorAnnouncement: errorInstance,
    });
  }

  /**
   * reset the state of the error alone
   */
  clearError() {
    this.store.update({
      errorAnnouncement: null,
    });
  }

  private openErrorSnackBar() {
    const timeout = this.store.getValue().errorAnnouncement.timeout;
    const config: MatSnackBarConfig = {
      duration: timeout ? timeout * 1000 : undefined,
      panelClass: 'text-danger',
    };
    this.matSnackBar.open(
      this.store.getValue().errorAnnouncement.message,
      'close',
      config,
    ).afterDismissed().subscribe(() => {
      this.clearError();
    });
  }

  private openInfoSnackBar() {

  }
}
