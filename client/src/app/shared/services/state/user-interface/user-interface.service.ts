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
        this.openNotifySnackBar();
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
   * display info dialog
   * @param message
   * @param timeout second
   */
  setNotify(message: string, timeout?: number) {
    const notify: SnackBarModel = { message, timeout };
    this.store.update({
      infoAnnouncement: notify,
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

  /**
   * reset the state of the error alone
   */
  clearNotify() {
    this.store.update({
      infoAnnouncement: null,
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

  private openNotifySnackBar() {
    const timeout = this.store.getValue().infoAnnouncement.timeout;
    const config: MatSnackBarConfig = {
      duration: timeout ? timeout * 1000 : 3000,
    };
    this.matSnackBar.open(
      this.store.getValue().infoAnnouncement.message,
      'close',
      config,
    ).afterDismissed().subscribe(() => {
      this.clearNotify();
    });
  }
}
