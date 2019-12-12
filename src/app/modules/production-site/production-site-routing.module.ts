import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionSiteComponent } from './production-site.component';
import { ProductionSiteService, BoardResolve } from './production-site.service';
import { ScrumboardBoardComponent } from './board/board.component';


const routes: Routes = [
  {
    path: 'boards',
    component: ProductionSiteComponent,
    resolve: {
      scrumboard: ProductionSiteService
    }
  },
  {
    path: 'boards/:boardId/:boardUri',
    component: ScrumboardBoardComponent,
    resolve: {
      board: BoardResolve
    }
  },
  {
    path: '**',
    redirectTo: 'boards'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductionSiteRoutingModule { }
