import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
// import { ProductionSiteService } from './production-site.service';
import { Board } from './board.model';
import { ProductionSite } from './models/production-site';
import { ProductionSiteService } from './services/production-site.service';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-production-site',
  templateUrl: './production-site.component.html',
  styleUrls: ['./production-site.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProductionSiteComponent implements OnInit, OnDestroy {
  boards: any[];
  productionSites: ProductionSite[];

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
    private productionSiteService: ProductionSiteService,
    
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
  


    this.getListProductionSite();
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  getListProductionSite() {
    this.productionSiteService.getListProductionSite().subscribe(ps => {
      this.productionSites = ps as ProductionSite[];
    });
  }

}
