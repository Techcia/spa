import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDashboardModule} from './project-routing.module';
import { ProjectDashboardComponent } from './project.component';


@NgModule({
  declarations: [ProjectDashboardComponent],
  imports: [
    CommonModule,
    ProjectDashboardModule
  ]
})
export class ProjectModule {}

