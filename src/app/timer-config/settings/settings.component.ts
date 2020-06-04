import { Component } from '@angular/core';
import defaultConfiguration from '../default-config';
import { TimeTrackerService } from 'src/app/core/services/time-tracker.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  defaultConfig = defaultConfiguration;
  validation = [Validators.required, Validators.pattern('^[1-9][0-9]*$')];
  settings = new FormGroup({
    sessionLength: new FormControl(
      this.defaultConfig.sessionTime / 60,
      this.validation
    ),
    breakLength: new FormControl(
      this.defaultConfig.breakTime / 60,
      this.validation
    ),
    additionalBreak: new FormControl(
      this.defaultConfig.additionalBreakTime / 60,
      this.validation
    ),
    longBreakInterval: new FormControl(
      this.defaultConfig.longBreakInterval,
      this.validation
    ),
  });

  constructor(private timeTrackerService: TimeTrackerService) {}

  apply() {
    this.timeTrackerService.configChange(
      this.settings.get('sessionLength').value * 60,
      this.settings.get('breakLength').value * 60,
      this.settings.get('additionalBreak').value * 60,
      this.settings.get('longBreakInterval').value,
      this.defaultConfig.autoplay
    );
  }
}
