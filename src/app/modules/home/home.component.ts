import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardSalesService } from './services/dashboard-sales.service';
import { from, of } from 'rxjs';
import * as moment from "moment";
import { map, reduce, finalize } from 'rxjs/operators';
import { ChartLine } from 'app/shared/chart/chart-line';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filterDashboard: FormGroup = this.fb.group({
    period: [5, [Validators.required]],
    initalDate: [''],
    finalDate: ['']
  });

  dashboard: any;
  totalNumber: number = 0;
  totalValue: number = 0;
  media: number = 0;
  initialDate: Date;
  finalDate: Date;
  chartLine: ChartLine;
  dataChart: any;
  loading: boolean = false;
  minDate: Date = new Date();;


  constructor(private fb: FormBuilder, private dashboardService: DashboardSalesService, private _adapter: DateAdapter<any>) {
    this._adapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.minDate.setFullYear(this.minDate.getFullYear() - 1);
    this.dashboard = this.dashboardService.dashboard;
    this.initialDate = this.dashboardService.initialDate;
    this.finalDate = this.dashboardService.finalDate;
    this.calculateValues();
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
      finalDate: new Date(this.finalDate.getTime() - (this.finalDate.getTimezoneOffset() * 60000)).toISOString()
    }

    console.log(data);

    this.dashboardService.getDashboardSale(data).pipe(finalize(() => {
      this.loading = false;
    })).subscribe(dashboard => {
      this.dashboard = dashboard;
      this.calculateValues();
      this.createDataChart();
    })
  }

  calculateValues() {
    this.totalNumber =  0;
    this.totalValue = 0;
    this.media = 0;
    if (this.dashboard.length > 0) {
      from(this.dashboard).pipe(map((parking: any) => { return parking.sales })).subscribe((sales: any) => {
        this.totalNumber = sales.length;
        if (this.totalNumber > 0) {
          const accumulator = (acc, curr) => acc + curr.value;
          from(sales).pipe(reduce(accumulator, 0)).subscribe(sum => {
            this.totalValue = sum;
            this.media = sum / this.differInHours();
          });
        }
      })
    }
  }

  createInitialDate(): Date {
    let initialDate = new Date();
    initialDate.setHours(0, 0, 0, 0);
    switch (this.filterDashboard.value.period) {
      case 1: {
        return initialDate;
      }
      case 2: {
        initialDate.setDate(initialDate.getDate() - 1);
        return initialDate;
      }
      case 3: {
        let date = moment().day(0).hours(0).minute(0).second(0).millisecond(0);
        return date.toDate();
      }
      case 4: {
        let date = moment().day(0 - 7).hours(0).minute(0).second(0).millisecond(0);
        return date.toDate();
      }
      case 5: {
        initialDate.setDate(1);
        return initialDate;
      }
      case 6: {
        initialDate.setDate(1);
        initialDate.setMonth(initialDate.getMonth() - 1);
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
        finalDate.setDate(finalDate.getDate() - 1);
        return finalDate;
      }
      case 3: {
        return finalDate;
      }
      case 4: {
        let date = moment().day(6 - 7).hour(23).minute(59).second(59);
        return date.toDate();
      }
      case 5: {
        return finalDate;
      }
      case 6: {
        let currentDate = moment();
        let date = moment(currentDate).add(-1, 'M').endOf("month");
        return date.toDate();
      } case 7: {
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
    this.chartLine = new ChartLine("chartDiv");
  }

  createDataChart() {
    this.chartLine.clearSeries();
    if (this.dashboard.length <= 0)
      return [];
    let i: number = 0;
    console.log
    from(this.dashboard).subscribe((parking: any) => {
      parking.sales.push({
        dataPay: this.finalDate,
        value: 0
      });
      parking.sales.unshift({
        dataPay: this.initialDate,
        value: 0
      });
      this.chartLine.createSerie(parking);
      i++;
    });
  }

  differInHours() {
    var today = moment(this.finalDate);
    var day = moment(this.initialDate);
    var duracao = moment.duration(today.diff(day));
    var horas = duracao.asHours();
    return horas;
  }

}
