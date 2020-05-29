import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeTrackerService } from 'src/app/cores/services/time-tracker.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  timerDisplay$: BehaviorSubject<number>;
  sessionCount = 1;
  breakCount = 0;
  toggle = true;
  animations = {
    animation: `blink ${0}s infinte alternate`,
  };

  constructor(public timeTracker: TimeTrackerService) {}

  ngOnInit(): void {
    this.timeTracker.configurationChange$
      .pipe(
        tap(() => {
          this.animations.animation = `blink ${0}s infinite alternate`;
          this.toggle = true;
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });

    this.timeTracker.timerClass.countDownEnd$
      .pipe(
        tap(() => {
          this.timeTracker.autoPlay ? '' : (this.toggle = true);
          this.timeTracker.autoPlay
            ? ''
            : (this.animations.animation = `blink ${0}s infinite alternate`);
          this.sessionCount = this.timeTracker.sessionCount;
          this.breakCount = this.timeTracker.breakCount;
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }

  pause() {
    this.animations.animation = `blink ${0}s infinite alternate`;
    this.toggle = true;
    this.timeTracker.timerPause();
  }

  start() {
    this.animations.animation = `blink ${1}s infinite alternate`;
    this.toggle = false;
    this.timeTracker.timerStart();
  }

  restart() {
    this.animations.animation = `blink ${0}s infinite alternate`;
    this.toggle = true;
    this.timeTracker.timerRestart();
  }

  /**ngOnDestroy() {
    this.timeTracker.timerClass.onDestroy();
  }*/
}
