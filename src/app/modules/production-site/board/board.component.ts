import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, pipe, concat, BehaviorSubject, Subscription, of } from 'rxjs';
import { takeUntil, groupBy, mergeMap, toArray, map, filter, concatAll, concatMap, find, debounceTime, delay } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
//import { ProductionSiteService } from '../production-site.service';
import { List } from '../list.model';
import { ProductionSiteService } from '../services/production-site.service';
import { Card } from '../card.model';
import { WebSocketService } from '../services/web-socket.service';



@Component({
    selector: 'scrumboard-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ScrumboardBoardComponent implements OnInit, OnDestroy {
    board: any;
    idPs: number;
    cardsSubject: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>(null);
    cards: Card[];

    messageSubscription: Subscription;

    done = [];
    doing = [];
    todo = [];

    // Private

    constructor(
        private productionSiteService: ProductionSiteService,
        private activatedRoute: ActivatedRoute,
        private ws: WebSocketService
    ) {
    }

    ngOnInit(): void {
        this.idPs = this.activatedRoute.snapshot.params.boardId;
        const name = this.activatedRoute.snapshot.params.boardName;
        this.board = {
            name: name,
            lists: [
                { id: 1, name: 'Não iniciado', icon: 'alarm_off', status: "TODO" },
                { id: 2, name: 'Preparando', icon: 'alarm', status: "DOING" },
                { id: 3, name: 'Pronto', icon: 'alarm_on', status: "DONE" }
            ]
        };
        this.getCards(this.idPs);

        setTimeout(() => {
            location.reload();
        }, 600000);
    }

    ngOnDestroy(): void {
        this.ws.disconnect();
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
    }

    getCards(id: number) {

        this.productionSiteService.getCardsBySite(id).subscribe((cards: any) => {
            this.cardsSubject.next(cards);
            this.socketTodo();
        });
        this.cardsSubject.subscribe(cards => this.cards = cards);
    }

    validChange: boolean = false;
    socketTodo() {
        this.ws.initializingConnection(this.idPs);
        this.messageSubscription = this.ws.messages.pipe(debounceTime(500)).subscribe(message => {
            if (message != null) {
                let card = this.cards.findIndex(card => card.id == message.id);
                if (card == -1) {
                    this.cards.push(message);
                    this.cardsSubject.next(this.cards);
                }
            }
        })
    }

    onDropCard(event: any) {
        this.validChange = true;
    }
}
