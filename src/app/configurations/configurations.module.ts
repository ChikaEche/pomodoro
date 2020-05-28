import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, ConfigurationsRoutingModule, SharedModule],
  exports: [SettingsComponent],
})
export class ConfigurationsModule {}
