import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardSalesService } from './services/dashboard-sales.service';
import { from, of } from 'rxjs';
import * as moment from "moment";
import * as momentTimezone from 'moment-timezone';
import { map, reduce, finalize, groupBy, flatMap, mergeMap, toArray } from 'rxjs/operators';
import { ChartLine } from 'app/shared/chart/chart-line';
import { DateAdapter } from '@angular/material';
import { DashboardSale } from 'app/shared/models/dashboard-sale';
import { ChartBar } from 'app/shared/chart/chart-bar';
import { ParkingService } from '../parking/services/parking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filterDashboard: FormGroup = this.fb.group({
    period: [3, [Validators.required]],
    initalDate: [''],
    finalDate: [''],
    parkings: [[], [Validators.required]]
  });

  dashboardSale: DashboardSale;
  initialDate: Date;
  finalDate: Date;
  chartBar: any;
  dataChart: any;
  loading: boolean = false;
  minDate: Date = new Date();
  parkings: any;


  constructor(
    private fb: FormBuilder, 
    private dashboardService: DashboardSalesService, 
    private parkingService: ParkingService, 
    private _adapter: DateAdapter<any>,
    ) {
    this._adapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.minDate.setFullYear(this.minDate.getFullYear() - 1);
    this.dashboardSale = this.dashboardService.dashboardSale;
    this.parkings = this.parkingService.parkings;
    of(this.parkingService.parkings).pipe(map(ps => { return ps.map(p => { return p.id }) })).subscribe(p => {
      this.filterDashboard.controls.parkings.setValue(p);
    })
    this.initialDate = this.dashboardService.initialDate;
    this.finalDate = this.dashboardService.finalDate;
    this.createChart();
    this.createDataChart();
  }

  getDashboardSale() {
    this.loading = true;
    if (this.filterDashboard.invalid) {
      this.loading = false;
      return;
    }

    this.initialDate = this.createInitialDate();
    this.finalDate = this.createFinalDate();

    let data = {
      initialDate: new Date(this.initialDate.getTime() - (this.initialDate.getTimezoneOffset() * 60000)).toISOString(),
      finalDate: new Date(this.finalDate.getTime() - (this.finalDate.getTimezoneOffset() * 60000)).toISOString(),
      parkings: this.filterDashboard.controls.parkings.value
    }
    this.dashboardService.getDashboardSale(data).pipe(finalize(() => {
      this.loading = false;
    })).subscribe((dashboard: DashboardSale) => {
      this.dashboardSale = dashboard;
      this.createDataChart();
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
        initialDate.setFullYear(initialDate.getFullYear() -1);
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
      }case 5: {
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
        d.setFullYear(d.getFullYear() -1);
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

  createChart() {
    this.chartBar = new ChartBar("chartDiv");
  }

  createDataChart(){
    this.chartBar.chart.data = this.dashboardSale.sales;
  }

  // createDataChart() {
  //   this.chartLine.clearSeries();
  //   if (this.dashboard.length <= 0)
  //     return [];
  //   let i: number = 0;
  //   from(this.dashboard).subscribe((parking: any) => {
  //     let sales = parking.sales.map((sale: any) => {
  //       let date = momentTimezone(sale.dataPay).tz('Europe/London').format('DDMMYYYY');
  //       return { ...sale, data: Number(date) };
  //     });

  //     let salesCalculate = [];

  //     const accumulator = (acc, curr) => acc + curr.value;
  //     from(sales).pipe(
  //       groupBy((x: any) => x.data),
  //       flatMap(group => group.pipe(toArray()))
  //     ).subscribe(sum => {
  //       let value = 0;
  //       from(sum).subscribe(res => {
  //         value += res.value
  //       })
  //       salesCalculate.push({
  //         value: value,
  //         dataPay: sum[sum.length - 1].dataPay
  //       })
  //     });

  //     salesCalculate.push({
  //       dataPay: this.finalDate,
  //       value: 0
  //     });
  //     salesCalculate.unshift({
  //       dataPay: this.initialDate,
  //       value: 0
  //     });
  //     this.chartLine.createSerie(parking, salesCalculate);
  //     i++;
  //   });
  // }

  differInHours() {
    var today = moment(this.finalDate);
    var day = moment(this.initialDate);
    var duracao = moment.duration(today.diff(day));
    var horas = duracao.asHours();
    return horas;
  }

}
