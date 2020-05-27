import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { DashboardRoutingModule } from './dashboard-router';
import {
  MinutesConverterPipe,
  SecondsConverterPipe,
} from 'src/app/cores/pipe/seconds-converter.pipe';
import { ConfigurationsModule } from '../configurations/configurations.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TimerComponent,
    MinutesConverterPipe,
    SecondsConverterPipe,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ConfigurationsModule,
    MatTabsModule,
    MatIconModule,
  ],
})
export class DashboardModule {}
