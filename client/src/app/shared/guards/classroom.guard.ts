import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassroomQuery, ClassroomService } from '../services/state/classroom';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClassroomGuard implements CanActivateChild {
  constructor(
    private classroomService: ClassroomService,
    private classroomQuery: ClassroomQuery,
    private router: Router,
  ) {
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!next.paramMap.has('room-id')) {
      this.router.navigate(['/client', 'dashboard']);
      return false;
    }
    const roomID = next.paramMap.get('room-id');
    const roomActiveId = this.classroomQuery.getActiveId();
    const roomActive = this.classroomQuery.getEntity(roomActiveId);
    if (roomActive && roomActive._id === roomID) {
      return true;
    }

    return this.classroomService.getOne(roomID).pipe(
      map(classInfo => {
        if (classInfo) {
          this.classroomService.setActiveClass(classInfo);
          return true;
        }
        return false;
      }),
    );
  }

}
