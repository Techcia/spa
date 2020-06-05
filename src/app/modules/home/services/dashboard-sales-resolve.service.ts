import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { DashboardSalesService } from './dashboard-sales.service';
import { ParkingService } from 'app/modules/parking/services/parking.service';
import { map, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardSalesResolveService implements Resolve<any> {

  constructor(private dashboardService: DashboardSalesService, private parkingService: ParkingService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any> | Promise<any> | any> {
    await this.parkingService.getParkingsResolve();
    let parkings = await of(this.parkingService.parkings).pipe(map(ps => { return ps.map(p => { return p.id }) })).toPromise();
    return new Promise((resolve, reject) => {
      Promise.all([
        this.dashboardService.resolveDashboardSale(parkings)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
}
