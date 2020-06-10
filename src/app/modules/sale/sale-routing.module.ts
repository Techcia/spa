import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SaleComponent } from './sale.component';
import { SaleResolveService } from './services/sale-resolve.service';

const routes: Routes = [
    {
      path: '',
      component: SaleComponent,
      resolve: {
          data: SaleResolveService
      }
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SaleRoutingModule { }