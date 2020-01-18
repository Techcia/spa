import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ProductionSite } from '../models/production-site';
import { environment } from 'environments/environment';
import { Card } from '../models/card';
import { WebSocketService } from './web-socket.service';
import { map, catchError } from 'rxjs/operators';
import { ModalErrorComponent } from 'app/shared/layout/components/modal-error/modal-error.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductionSiteService {

  public messages: Subject<any>;
  modalErrorStatus: boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {

  }

  getListProductionSite(): Observable<ProductionSite[]> {
    return this.http.get<ProductionSite[]>(environment.apiProductionSite + "/ps/list").pipe(catchError(err => {
      this.errorRequest();
      throw err
    }));
  }

  getCardsBySite(id: number): Observable<Card[]> {

    return this.http.get<Card[]>(environment.apiProductionSite + '/card/bySite/' + id).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }));
  }

  changeStatus(id: number, status: string) {
    return this.http.post<Card[]>(environment.apiProductionSite + '/card/changeStatus/' + id + '/' + status, {}).pipe(catchError(err => {
      if (!this.modalErrorStatus) {
        this.modalErrorStatus = true;
        this.errorRequestStatus();
      }
      throw err
    }));
  }

  reprintNote(card: any) {
    return this.http.get(environment.apiProductionSite + '/card/print/' + card.id).pipe(catchError(err => {
      this.errorRequest();
      throw err
    }));
  }

  errorRequest() {
    const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: "Erro ao realizar requisição", message: 'Houve um problema de comunicação com o nosso sistema!' } });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  errorRequestStatus() {
    const dialogRef = this.dialog.open(ModalErrorComponent, { data: { title: "Erro ao realizar requisição", message: 'Houve um problema de comunicação com o nosso sistema!' } });
    dialogRef.afterClosed().subscribe((result: any) => {
      location.reload();
    });
  }
}
