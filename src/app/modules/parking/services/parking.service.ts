import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map, debounceTime, catchError } from 'rxjs/operators';
import { ModalErrorComponent } from 'app/shared/layout/components/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  url: string = environment.apiUrl + "/parkings";

  parkings: any[];
  onParkingChanged: BehaviorSubject<any>;
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.onParkingChanged = new BehaviorSubject({});
   }

   getParkings(): Observable<any>{
      return this.http.get<any>(this.url);
   }

   deleteParking(id: number): Observable<any>{
    return this.http.delete(this.url + "/" + id).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }))
   }

   getParkingsResolve(){
    return new Promise((resolve, reject) => {
      this.getParkings().pipe(debounceTime(150),
        catchError(err => {
          this.errorRequest();
          throw err
        }))
        .subscribe((response: any) => {
          this.parkings = response;
          this.onParkingChanged.next(response);
          resolve(response.content);
        }, reject);
    });
   }

   errorRequest() {
    const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: "Erro ao realizar requisição", message: 'Houve um problema de comunicação com o nosso sistema!' } });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

   
}
