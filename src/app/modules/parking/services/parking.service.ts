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
  parking: any[];
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.onParkingChanged = new BehaviorSubject({});
   }

   getParkings(): Observable<any>{
      return this.http.get<any>(this.url + "/company");
   }

   getParkingById(id: number): Observable<any>{
    return this.http.get<any>(this.url + "/" + id);
 }

   createParking(parking: any){
    return this.http.post(this.url, parking).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }))
   }

   editParking(parking: any){
    return this.http.put(this.url + "/"+parking.id, parking).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }))
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

   getParkingByIDResolve(id: number){
    return new Promise((resolve, reject) => {
      this.getParkingById(id).pipe(debounceTime(150),
        catchError(err => {
          this.errorRequest();
          throw err
        }))
        .subscribe((response: any) => {
          this.parking = response;
          this.onParkingChanged.next(response);
          resolve(response.content);
        }, reject);
    });
   }

   findCep(cep: string): Observable<any>{
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
   }

   errorRequest() {
    const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: "Erro ao realizar requisição", message: 'Houve um problema de comunicação com o nosso sistema!' } });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

   
}
