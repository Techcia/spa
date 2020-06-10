import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleService } from './services/sale.service';
import { SaleResolveService } from './services/sale-resolve.service';
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
import { FuseConfirmDialogModule, FuseSidebarModule, FuseProgressBarModule } from '@fuse/components';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatSpinner, MatProgressSpinnerModule, MatDatepicker, MatDatepickerModule } from '@angular/material';

@NgModule({
  declarations: [SaleComponent],
  imports: [
    CommonModule,
    SaleRoutingModule,
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
    MatDialogModule,
    NgxMaskModule.forRoot(options),
    CurrencyMaskModule,
    MatProgressSpinnerModule,
    FuseProgressBarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [SaleService, SaleResolveService]
})
export class SaleModule { }
