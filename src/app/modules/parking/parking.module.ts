import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingComponent } from './parking.component';
import { ParkingListComponent } from './components/parking-list/parking-list.component';
import { ParkingEditComponent } from './components/parking-edit/parking-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { MatDialogModule } from '@angular/material/dialog';
import { ParkingService } from './services/parking.service';
import { ParkingCreateComponent } from './components/parking-create/parking-create.component';

@NgModule({
  declarations: [ParkingComponent, ParkingListComponent, ParkingEditComponent, ParkingCreateComponent],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    FuseConfirmDialogModule,
    FuseSidebarModule,
    MatDialogModule
  ],
  providers: [
    ParkingService
  ]
})
export class ParkingModule { }
