import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [SettingsComponent],
})
export class ConfigurationsModule {}
