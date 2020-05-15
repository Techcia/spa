import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkingModule } from './parking.module';
import { ParkingComponent } from './parking.component';
import { ParkingListComponent } from './components/parking-list/parking-list.component';
import { ParkingCreateComponent } from './components/parking-create/parking-create.component';
import { ParkingEditComponent } from './components/parking-edit/parking-edit.component';
import { ParkingListResolveService } from './services/resolves/parking-list-resolve.service';
import { ParkingEditResolveService } from './services/resolves/parking-edit-resolve.service';


const routes: Routes = [
  {
    path: '',
    component: ParkingComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ParkingListComponent,
        resolve: {
          data: ParkingListResolveService
        }
      },
      {
        path: 'create',
        component: ParkingCreateComponent,
      },
      {
        path: 'edit/:id',
        component: ParkingEditComponent,
        resolve: {
          data: ParkingEditResolveService
        }
      },
    ]
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
