import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ParkingService } from '../parking.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingListResolveService implements Resolve<any> {

  constructor(private parkingService: ParkingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.parkingService.getParkingsResolve()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
}
