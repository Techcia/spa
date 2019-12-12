import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProductionSiteService } from './production-site.service';
import { Board } from './board.model';

@Component({
  selector: 'app-production-site',
  templateUrl: './production-site.component.html',
  styleUrls: ['./production-site.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProductionSiteComponent implements OnInit, OnDestroy {
  boards: any[];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} _router
   * @param {ScrumboardService} _scrumboardService
   */
  constructor(
    private _router: Router,
    private _scrumboardService: ProductionSiteService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._scrumboardService.onBoardsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(boards => {
        this.boards = boards;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * New board
   */
  newBoard(): void {
    const newBoard = new Board({});
    this._scrumboardService.createNewBoard(newBoard).then(() => {
      this._router.navigate(['/production-site/boards/' + newBoard.id + '/' + newBoard.uri]);
    });
  }
}
