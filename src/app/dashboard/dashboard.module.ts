import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer.component';
import { DashboardRoutingModule } from './dashboard-router';
import {
  MinutesConverterPipe,
  SecondsConverterPipe,
} from 'src/app/cores/pipe/seconds-converter.pipe';
import { ConfigurationsModule } from '../configurations/configurations.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TimerComponent,
    MinutesConverterPipe,
    SecondsConverterPipe,
    DashboardComponent,
  ],
  imports: [DashboardRoutingModule, ConfigurationsModule, SharedModule],
})
export class DashboardModule {}
