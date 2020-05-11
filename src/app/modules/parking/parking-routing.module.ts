import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkingModule } from './parking.module';
import { ParkingComponent } from './parking.component';
import { ParkingListComponent } from './components/parking-list/parking-list.component';
import { ParkingCreateComponent } from './components/parking-create/parking-create.component';
import { ParkingEditComponent } from './components/parking-edit/parking-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ParkingComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ParkingListComponent,
      },
      {
        path: 'create',
        component: ParkingCreateComponent,
      },
      {
        path: 'edit/:id',
        component: ParkingEditComponent,
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
