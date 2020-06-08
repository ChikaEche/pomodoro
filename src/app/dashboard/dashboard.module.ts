import { NgModule } from '@angular/core';
import { TimerComponent } from './timer/timer.component';
import { DashboardRoutingModule } from './dashboard-router';
import { DashboardComponent } from './tabs/tabs.component';
import { SharedModule } from '../shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { TaskComponent } from './task/task.component';
import { TimerConfigModule } from '../timer-config/timer-config.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    TimerComponent,
    DashboardComponent,
    StatisticsComponent,
    TaskComponent,
    ProfileComponent,
  ],
  imports: [DashboardRoutingModule, SharedModule, TimerConfigModule],
})
export class DashboardModule {}
