import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, catchError, timeout } from 'rxjs/operators';
import { ModalErrorComponent } from 'app/shared/layout/components/modal-error/modal-error.component';
import { MatDialog } from '@angular/material';
import { environment } from 'environments/environment';
import { DashboardSale } from 'app/shared/models/dashboard-sale';

@Injectable({
  providedIn: 'root'
})
export class DashboardSalesService {
  dashboardSale: DashboardSale;
  initialDate: Date;
  finalDate: Date;
  constructor(private http: HttpClient, private dialog: MatDialog) { }

  getDashboardSale(data: any) {
    return this.http.post(environment.apiUrl + `/dashboard/sales`, data);
  }

  resolveDashboardSale(parkings: any) {
    let initialDate = new Date();
    initialDate.setMonth(initialDate.getMonth());
    initialDate.setDate(1);
    let finalDate = new Date();
    finalDate.setMonth(finalDate.getMonth());

    this.initialDate = initialDate;
    this.finalDate = finalDate;
    initialDate.setHours(0, 0, 0, 0);
    finalDate.setHours(23, 59, 59, 0);
    let data = {
      initialDate: new Date(initialDate.getTime() - (initialDate.getTimezoneOffset() * 60000)).toISOString(),
      finalDate: new Date(finalDate.getTime() - (finalDate.getTimezoneOffset() * 60000)).toISOString(),
      parkings: parkings
    };
    return new Promise((resolve, reject) => {
      this.getDashboardSale(data).pipe(
        timeout(25000),
        debounceTime(150),
        catchError(err => {
          this.errorRequest();
          throw err
        }))
        .subscribe((response: any) => {
          this.dashboardSale = response;
          resolve(response);
        }, reject);
    });
  }

  errorRequest() {
    const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: "Erro ao realizar requisição", message: 'Houve um problema de comunicação com o nosso sistema!' } });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
