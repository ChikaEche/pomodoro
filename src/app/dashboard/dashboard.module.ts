import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer.component';
import { DashboardRoutingModule } from './dashboard-router';
import { SecondsConverterPipe } from 'src/app/core/pipes/seconds-converter.pipe';
import { ConfigurationsModule } from '../configurations/configurations.module';
import { DashboardComponent } from './tabs/tabs.component';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    TimerComponent,
    SecondsConverterPipe,
    DashboardComponent,
    StatisticsComponent,
    TaskComponent,
  ],
  imports: [DashboardRoutingModule, ConfigurationsModule, SharedModule],
})
export class DashboardModule {}
