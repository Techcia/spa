import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardSalesResolveService } from './services/dashboard-sales-resolve.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      data: DashboardSalesResolveService
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
export class HomeRoutingModule { }
