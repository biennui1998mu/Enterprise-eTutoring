import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from '../interface/Classroom';
import { ClassroomQuery, ClassroomService } from '../services/state/classroom';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClassroomResolver implements Resolve<Classroom> {
  constructor(
    private service: ClassroomService,
    private query: ClassroomQuery,
  ) {
  }

  /**
   * Resolver will run before the page load -> force the page to wait for the data to response
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Classroom> | Promise<Classroom> | Classroom {
    if (route.paramMap.has('room-id')) {
      // check if have room-id => get the id
      const roomId = route.paramMap.get('room-id');
      const fromState = this.query.getEntity(roomId);
      if (fromState) {
        // if there is data in the classroom state
        // example: user navigate from other angular page (not reload the page)
        // then fromState will return the class in the state.
        this.service.setActiveClass(fromState);
        return fromState;
      } else {
        // if the state of all data did not exist
        // then API the room to confirm the client is authorized in the class
        // and set the retrieved room (if has) as the active
        return this.service.getOne(roomId).pipe(
          tap(room => {
            if (room) {
              this.service.setActiveClass(room);
            }
          }),
        );
      }
    }
    return null;
  }
}
