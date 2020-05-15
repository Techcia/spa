import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ParkingService } from '../parking.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingEditResolveService implements Resolve<any> {

  constructor(private parkingService: ParkingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.parkingService.getParkingByIDResolve(route.params.id)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
}
