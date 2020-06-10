import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { timeout, debounceTime, catchError } from 'rxjs/operators';
import { ModalErrorComponent } from 'app/shared/layout/components/modal-error/modal-error.component';
import { MatDialog } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  url = environment.apiUrl + "/sales";

  salePage: any;
  sales: any;
  onSaleChanged: BehaviorSubject<any>;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.onSaleChanged = new BehaviorSubject({});
  }

  getSales(data: any): Observable<any> {
    return this.http.get(this.url + `/search?initialDate=${data.initialDate}&finalDate=${data.finalDate}&page=${data.page}&size=${data.size}&parkings=${data.parkings}&nameClient=${data.nameClient}`)
  }

  getSalesResolve(parkings: string): Promise<any> {
    let initialDate = new Date();
    initialDate.setMonth(initialDate.getMonth());
    initialDate.setDate(1);
    let finalDate = new Date();
    finalDate.setMonth(finalDate.getMonth());
    initialDate.setHours(0, 0, 0, 0);
    finalDate.setHours(23, 59, 59, 0);
    let data = {
      initialDate: new Date(initialDate.getTime() - (initialDate.getTimezoneOffset() * 60000)).toISOString(),
      finalDate: new Date(finalDate.getTime() - (finalDate.getTimezoneOffset() * 60000)).toISOString(),
      parkings: parkings,
      nameClient: "",
      page: 1,
      size: 10
    };
    return new Promise((resolve, reject) => {
      this.getSales(data).pipe(
        timeout(25000),
        debounceTime(150),
        catchError(err => {
          this.errorRequest();
          throw err
        }))
        .subscribe((response: any) => {
          this.salePage = response;
          this.sales = response.content;
          this.onSaleChanged.next(response.content)
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
