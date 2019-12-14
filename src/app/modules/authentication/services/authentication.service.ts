import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string = environment.apiUrl + "/oauth/token?grant_type=client_credentials";
  urlUnipix = "http://18.231.83.217:8080/servicosdigitais/login";

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.url, { username: username, password: password })
      .pipe(
        map(res => {
          if (res.token) {
            localStorage.setItem('access_token', JSON.stringify(res.token));
            this.router.navigate(['production-site']);
          }
          return res;
        }),
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['authentication/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
