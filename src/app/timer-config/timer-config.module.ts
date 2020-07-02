import { NgModule } from '@angular/core';

import { TimerConfigRoutingModule } from './timer-config-routing.module';
import { SettingsComponent } from '../dashboard/settings/settings.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [TimerConfigRoutingModule, SharedModule],
  exports: [SettingsComponent],
})
export class TimerConfigModule {}
