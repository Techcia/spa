import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsDashboardModule } from './analytics-routing.module';
import { AnalyticsDashboardComponent } from './analytics.component';



@NgModule({
    declarations: [AnalyticsDashboardComponent],
    imports: [
      CommonModule,
      AnalyticsDashboardModule
    ]
  })
  export class AnalyticsModule { }

