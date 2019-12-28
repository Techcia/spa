import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscribable, Subscription, BehaviorSubject, from, of } from 'rxjs';
import { takeUntil, filter, debounceTime } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { ProductionSiteService } from '../../services/production-site.service';
import { ScrumboardCardDialogComponent } from '../dialogs/card/card.component';
import { Card } from '../../card.model';


@Component({
    selector: 'scrumboard-board-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScrumboardBoardListComponent implements OnInit, OnDestroy {
    board: any;
    dialogRef: any;

    @Input() list;
    @Input() cards: BehaviorSubject<Card[]>;
    @Input() type: string;
    @Output() onDropCard = new EventEmitter<any>();
    cardsSubscription: Subscription;
    dataSource: Card[];

    @ViewChild(FusePerfectScrollbarDirective, { static: false })
    listScroll: FusePerfectScrollbarDirective;
    constructor(private ptService: ProductionSiteService) { }

    ngOnInit(): void {
        this.cardsSubscription = this.cards.subscribe(cards => {
            this.dataSource = [];
            if (cards != null) {
                from(cards).pipe(filter((cards: any) => cards.status == this.type)).subscribe(res => this.dataSource.push(res));
            }
        });
        document.querySelector('toolbar').classList.add("d-none");
    }

    ngOnDestroy(): void {
        // this.cardsSubscription.unsubscribe();
        document.querySelector('toolbar').classList.remove("d-none");
    }


    onListNameChanged(newListName): void {
        this.list.name = newListName;
    }

    onDrop(ev): void {
        ev.value.status = this.list.status;
        this.ptService.changeStatus(ev.value.id, this.list.status).subscribe(() => {
        })
    }
}
