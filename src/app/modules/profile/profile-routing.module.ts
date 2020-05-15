import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileModule } from './profile.module';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './services/profile.service';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      data: ProfileService
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
export class ProfileRoutingModule { }
