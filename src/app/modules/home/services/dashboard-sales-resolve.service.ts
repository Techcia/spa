import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardSalesService } from './dashboard-sales.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardSalesResolveService implements Resolve<any> {

  constructor(private dashboardService: DashboardSalesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.dashboardService.resolveDashboardSale()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }
}
