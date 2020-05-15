import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ModalErrorComponent } from 'app/shared/layout/components/modal-error/modal-error.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements Resolve<any> {
  url: string = environment.apiUrl + "/companies";
  profile: any;
  constructor(private http: HttpClient, private dialog: MatDialog) { }

  getProfileResolve() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "/me").pipe(
        catchError(err => {
          this.errorRequest();
          throw err
        }))
        .subscribe((response: any) => {
          this.profile = response;
          resolve(response.content);
        }, reject);
    });
  }

  editProfile(profile: any) {
    return this.http.put(this.url + "/" + profile.id, profile).pipe(
      catchError(err => {
        this.errorRequest();
        throw err
      }));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getProfileResolve()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  errorRequest() {
    const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: "Erro ao realizar requisição", message: 'Houve um problema de comunicação com o nosso sistema!' } });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
