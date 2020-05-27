import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeTrackerService } from 'src/app/cores/services/time-tracker.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  timerDisplay$: BehaviorSubject<number>;
  toggle = true;
  animations = {
    animation: `blink ${0}s infinte alternate`,
  };

  constructor(private timeTracker: TimeTrackerService) {}

  ngOnInit(): void {
    this.timerDisplay$ = this.timeTracker.timerClass.remainingSeconds$;
  }

  pause() {
    this.animations.animation = `blink ${0}s infinite alternate`;
    this.toggle = !this.toggle;
    this.timeTracker.timerPause();
  }

  start() {
    this.animations.animation = `blink ${1}s infinite alternate`;
    this.toggle = !this.toggle;
    this.timeTracker.timerStart();
  }

  restart() {
    this.timeTracker.timerRestart();
  }

  ngOnDestroy() {
    this.timeTracker.timerClass.onDestroy();
  }
}
