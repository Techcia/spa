import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Subject, fromEvent, BehaviorSubject, Observable, merge, of } from 'rxjs';
import { SaleService } from './services/sale.service';
import { takeUntil, debounceTime, distinctUntilChanged, map, startWith, switchMap, catchError, finalize } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { ParkingService } from '../parking/services/parking.service';
import * as moment from "moment";
import * as momentTimezone from 'moment-timezone';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class SaleComponent implements OnInit, AfterViewInit {
  dataSource: any;
  displayedColumns = ['id', 'parking', 'client', 'value', 'status', 'checkin', 'dataPay', 'checkout'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild('filter', { static: true })
  filter: ElementRef;


  saleResult: any;
  pageSize = 10;
  parkings: any;
  parkingsStr: string;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  filterDashboard: FormGroup = this.fb.group({
    period: [3, [Validators.required]],
    initalDate: [''],
    finalDate: [''],
    parkings: [[], [Validators.required]]
  });

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _saleService: SaleService,
    public _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private parkingService: ParkingService,
    private fb: FormBuilder
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.saleResult = this._saleService.salePage;
    this.dataSource = this._saleService.sales;
    this.parkings = this.parkingService.parkings;
    of(this.parkingService.parkings).pipe(map(ps => { return ps.map(p => { return p.id }) })).subscribe(res => {
      this.filterDashboard.controls.parkings.setValue(res);
      this.parkingsStr = res.join(',');
    });
  }

  ngAfterViewInit(): void {
    this.getParking();
  }

  getParking() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          let initialDate = new Date();
          initialDate.setMonth(initialDate.getMonth());
          initialDate.setDate(1);
          let finalDate = new Date();
          finalDate.setMonth(finalDate.getMonth());
          initialDate.setHours(0, 0, 0, 0);
          finalDate.setHours(23, 59, 59, 0);
          this.isLoadingResults = true;
          let data = {
            initialDate: new Date(initialDate.getTime() - (initialDate.getTimezoneOffset() * 60000)).toISOString(),
            finalDate: new Date(finalDate.getTime() - (finalDate.getTimezoneOffset() * 60000)).toISOString(),
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
            parkings: this.parkingsStr,
            nameClient: ""
          };
          return this._saleService.getSales(data);
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => { this.dataSource = data });
  }

  findSales() {
    this.isLoadingResults = true;
    if (this.filterDashboard.invalid) {
      this.isLoadingResults = false;
      return;
    }
    let initialDate = this.createInitialDate();
    let finalDate = this.createFinalDate();

    let data = {
      initialDate: new Date(initialDate.getTime() - (initialDate.getTimezoneOffset() * 60000)).toISOString(),
      finalDate: new Date(finalDate.getTime() - (finalDate.getTimezoneOffset() * 60000)).toISOString(),
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      parkings: this.parkingsStr,
      nameClient: ""
    };
    this._saleService.getSales(data).pipe(finalize(() => { this.isLoadingResults = false })).subscribe(data => {
      this.resultsLength = data.totalElements;
      this.dataSource = data.content
    })
  }

  createInitialDate(): Date {
    let initialDate = new Date();
    initialDate.setHours(0, 0, 0, 0);
    switch (this.filterDashboard.value.period) {
      case 1: {
        let date = moment().day(0).hours(0).minute(0).second(0).millisecond(0);
        return date.toDate();
      }
      case 2: {
        let date = moment().day(0 - 7).hours(0).minute(0).second(0).millisecond(0);
        return date.toDate();
      }
      case 3: {
        initialDate.setDate(1);
        return initialDate;
      }
      case 4: {
        initialDate.setDate(1);
        initialDate.setMonth(initialDate.getMonth() - 1);
        return initialDate;
      }
      case 5: {
        initialDate.setDate(1);
        initialDate.setMonth(0);
        return initialDate;
      }
      case 6: {
        initialDate.setDate(1);
        initialDate.setMonth(0);
        initialDate.setFullYear(initialDate.getFullYear() - 1);
        return initialDate;
      }
      case 7: {
        this.filterDashboard.value.initalDate._d.setHours(0, 0, 0, 0)
        return this.filterDashboard.value.initalDate._d;
      }
      default: {
        return initialDate;
      }
    }
  }

  createFinalDate(): Date {
    let finalDate = new Date();
    finalDate.setHours(23, 59, 59, 0);
    switch (this.filterDashboard.value.period) {
      case 1: {
        return finalDate;
      }
      case 2: {
        let date = moment().day(6 - 7).hour(23).minute(59).second(59);
        return date.toDate();
      }
      case 3: {
        return finalDate;
      }
      case 4: {
        let currentDate = moment();
        let date = moment(currentDate).add(-1, 'M').endOf("month");
        return date.toDate();
      } case 5: {
        let currentDate = moment();
        let date = moment(currentDate).add(-1, 'M').endOf("month");
        let d = date.toDate();
        d.setMonth(11);
        return d;
      }
      case 6: {
        let currentDate = moment();
        let date = moment(currentDate).add(-1, 'M').endOf("month");
        let d = date.toDate();
        d.setMonth(11);
        d.setFullYear(d.getFullYear() - 1);
        return d;
      }
      case 7: {
        this.filterDashboard.value.finalDate._d.setHours(23, 59, 59, 0)
        return this.filterDashboard.value.finalDate._d;
      }
      default: {
        return finalDate;
      }
    }
  }

  onSelectPeriod(event: any) {
    this.filterDashboard.controls.initalDate.setValue('');
    this.filterDashboard.controls.finalDate.setValue('');
    this.filterDashboard.controls.initalDate.clearValidators();
    this.filterDashboard.controls.finalDate.clearValidators();
    if (this.filterDashboard.controls.period.value == 7) {
      this.filterDashboard.controls.initalDate.setValidators([Validators.required]);
      this.filterDashboard.controls.finalDate.setValidators([Validators.required]);
    }
    this.filterDashboard.controls.initalDate.updateValueAndValidity();
    this.filterDashboard.controls.finalDate.updateValueAndValidity();
  }
}
