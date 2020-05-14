import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {
  AuthGuardService as AuthGuard
} from './modules/authentication/services/auth-guard.service';


const appRoutes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'parking',
    loadChildren: () => import('./modules/parking/parking.module').then(m => m.ParkingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  //{
    //path: 'analytics',
    //loadChildren: () => import('./modules/dashboards/analytics/analytics.module').then(m => m.AnalyticsModule),
   // canActivate: [AuthGuard]
  //},
  {
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
