import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocketEndPoint: string = 'http://52.67.198.2:8080/ws';
  stompClient: any;
  public messages: BehaviorSubject<any> = null;

  constructor() {
  }

  initializingConnection(idPs: number) {
    console.log("Inicializando conexão");
    this.messages = new BehaviorSubject(null);
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => { this.connectProductionSite(idPs) }, () => { console.log("Não conectou") });
  };

  connectProductionSite(idPs: number) {
    let stomp_subscription = this.stompClient.subscribe('/ps/' + idPs, (message) => {
      this.messages.next(JSON.parse(message.body));
    });
  }

  disconnect() {
    if (this.stompClient !== undefined) {
      this.stompClient.disconnect();
      this.messages = null;
    }
  }

}

