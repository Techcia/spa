import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionSiteComponent } from './production-site.component';
import { ProductionSiteService, BoardResolve } from './production-site.service';
import { ScrumboardBoardComponent } from './board/board.component';


const routes: Routes = [
  {
    path: '',
    component: ProductionSiteComponent,
    resolve: {
      scrumboard: ProductionSiteService
    }
  },
  {
    path: 'boards/:boardName/:boardId',
    component: ScrumboardBoardComponent,
    resolve: {
      board: BoardResolve
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductionSiteRoutingModule { }
