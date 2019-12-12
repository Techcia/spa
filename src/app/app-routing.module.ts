import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  {path: '', redirectTo: 'production-site', pathMatch: 'full'},
  {
    path: 'production-site',
    loadChildren: () => import('./modules/production-site/production-site.module').then(m => m.ProductionSiteModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
