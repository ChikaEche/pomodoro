import { Component } from '@angular/core';
import Configuration from '../default-config';
import { TimeTrackerService } from 'src/app/cores/services/time-tracker.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  defaultConfig = Configuration;
  validation = [Validators.required, Validators.pattern('^[1-9][0-9]*$')];
  settings = new FormGroup({
    sessionLength: new FormControl(
      this.defaultConfig.sessionTime,
      this.validation
    ),
    breakLength: new FormControl(this.defaultConfig.breakTime, this.validation),
    additionalBreak: new FormControl(
      this.defaultConfig.additionalBreakTime,
      this.validation
    ),
    longBreakInterval: new FormControl(
      this.defaultConfig.longBreakInterval,
      this.validation
    ),
  });

  constructor(private timeTracker: TimeTrackerService) {}

  apply() {
    this.timeTracker.configChange(
      this.settings.get('sessionLength').value,
      this.settings.get('breakLength').value,
      this.settings.get('additionalBreak').value,
      this.settings.get('longBreakInterval').value,
      this.defaultConfig.autoplay
    );
  }
}
