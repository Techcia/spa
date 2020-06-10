import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { ParkingService } from 'app/modules/parking/services/parking.service';
import { SaleService } from './sale.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleResolveService implements Resolve<any>{

  constructor(private saleService: SaleService, private parkingService: ParkingService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<any> | Promise<any> | any> {
    await this.parkingService.getParkingsResolve();
    let parkings = await of(this.parkingService.parkings).pipe(map(ps => { return ps.map(p => { return p.id }) })).toPromise();
    let strParking = parkings.join(',');
    return new Promise((resolve, reject) => {
      Promise.all([
        this.saleService.getSalesResolve(strParking)
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
}
