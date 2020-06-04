import { NgModule } from '@angular/core';

import { ConfigurationsRoutingModule } from './timer-config-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [ConfigurationsRoutingModule, SharedModule],
  exports: [SettingsComponent],
})
export class TimerConfigModule {}
