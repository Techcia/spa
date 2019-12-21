import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, pipe, concat, BehaviorSubject } from 'rxjs';
import { takeUntil, groupBy, mergeMap, toArray, map, filter, concatAll, concatMap } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
//import { ProductionSiteService } from '../production-site.service';
import { List } from '../list.model';
import { ProductionSiteService } from '../services/production-site.service';
import { Card } from '../card.model';



@Component({
    selector: 'scrumboard-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ScrumboardBoardComponent implements OnInit, OnDestroy {
    board: any;

    done = new BehaviorSubject<Card[]>([]);
    doing = new BehaviorSubject<Card[]>([]);
    todo = new BehaviorSubject<Card[]>([]);

    // Private

    constructor(
        private productionSiteService: ProductionSiteService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.params.boardId;
        const name = this.activatedRoute.snapshot.params.boardName;
        this.board = {
            name: name,
            lists: [
                { id: 1, name: 'Não iniciado', icon: 'alarm_off', status: "TODO" },
                { id: 2, name: 'Preparando', icon: 'alarm', status: "DOING" },
                { id: 3, name: 'Pronto', icon: 'alarm_on', status: "DONE" }
            ]
        };
        this.getCards(id);
    }

    ngOnDestroy(): void {
    }

    getCards(id: number) {
        let done = [];
        let doing = [];
        let todo = [];
        this.productionSiteService.getCardsBySite(id).subscribe(cards => {
            from(cards).pipe(filter(cards => { return cards.status === 'TODO' })).subscribe(res => todo.push(res));
            from(cards).pipe(filter(cards => { return cards.status === 'DOING' })).subscribe(res => doing.push(res));
            from(cards).pipe(filter(cards => { return cards.status === 'DONE' })).subscribe(res => done.push(res));
            this.todo.next(todo);
            this.doing.next(doing);
            this.done.next(done);
        });
    }
}
