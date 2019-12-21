import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ProductionSite } from '../models/production-site';
import { environment } from 'environments/environment';
import { Card } from '../models/card';
import { WebSocketService } from './web-socket.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductionSiteService {

  messages: Subject<any>;

  constructor(private http: HttpClient, private wsService: WebSocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe(
        map((response: any): any => {
          return response;
        }))
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  getListProductionSite(): Observable<ProductionSite[]> {
    return this.http.get<ProductionSite[]>(environment.apiProductionSite + "/ps/list");
  }

  getCardsBySite(id: number): Observable<Card[]> {

    return this.http.get<Card[]>(environment.apiProductionSite + '/card/bySite/' + id);
  }

  changeStatus(id: number, status: string) {
    return this.http.post<Card[]>(environment.apiProductionSite + '/card/changeStatus/' + id + '/' + status, {}).subscribe(res => {
      return
    });
  }
}
