import { Component, OnInit } from '@angular/core';
import Configuration from '../default-config';
import { TimeTrackerService } from 'src/app/cores/services/time-tracker.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  defaultConfig = Configuration;
  sessionLength = this.defaultConfig.sessionTime;
  breakLength = this.defaultConfig.breakTime;
  additionalBreakLength = this.defaultConfig.additionalBreakTime;
  longBreakInterval = this.defaultConfig.longBreakInterval;
  autoplay = this.defaultConfig.autoplay;

  constructor(private timeTracker: TimeTrackerService) {}

  ngOnInit(): void {}

  apply() {
    this.timeTracker.additionalBreak = this.additionalBreakLength;
    this.timeTracker.breakDuration = this.breakLength;
    this.timeTracker.sessionDuration = this.sessionLength;
    this.timeTracker.autoPlay = this.autoplay;
    this.timeTracker.longBreakInterval = this.longBreakInterval;
    this.timeTracker.configChange();
  }
}
