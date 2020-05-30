import { Injectable } from '@angular/core';
import { Timer } from 'src/app/shared/timer';
import { tap, takeUntil } from 'rxjs/operators';
import defaultConfiguration from 'src/app/configurations/default-config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  timerClass: Timer;
  statistics$ = new Subject<number[]>();
  destroy$ = new Subject<void>();
  configurationChange$ = new Subject<void>();
  configuration = {
    sessionDuration: defaultConfiguration.sessionTime,
    breakDuration: defaultConfiguration.breakTime,
    additionalBreak: defaultConfiguration.additionalBreakTime,
    longBreakInterval: defaultConfiguration.longBreakInterval,
    autoPlay: defaultConfiguration.autoplay,
  };
  sessionCount = 0;
  breakCount = 0;
  timer = 0;
  currentState = 'session';

  constructor() {
    this.timerClass = new Timer();
    this.timer = this.configuration.sessionDuration;
    this.timerClass.seconds = this.timer;
    this.timerClass.countDownEnd$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.stateToggle()),
        tap(() => this.statistics$.next([this.sessionCount, this.breakCount]))
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }

  timerStart() {
    this.timerClass.start();
  }

  stateToggle() {
    if (this.currentState === 'session') {
      ++this.sessionCount;
      if (this.sessionCount % this.configuration.longBreakInterval === 0) {
        this.timer =
          this.configuration.breakDuration + this.configuration.additionalBreak;
        this.timerClass.seconds = this.timer;
      } else {
        this.timer = this.configuration.breakDuration;
        this.timerClass.seconds = this.timer;
      }
      this.currentState = 'break';
    } else if (this.currentState === 'break') {
      ++this.breakCount;
      this.timer = this.configuration.sessionDuration;
      this.timerClass.seconds = this.timer;
      this.currentState = 'session';
    }
    this.configuration.autoPlay ? this.timerStart() : '';
  }

  timerPause() {
    this.timerClass.pause();
    this.configurationChange$.next();
  }

  timerRestart() {
    this.timerClass.seconds = this.timer;
    this.timerPause();
  }

  configChange(
    session,
    breakLength,
    additionalBreak,
    longBreakInterval,
    autoPlay
  ) {
    this.configuration.sessionDuration = session;
    this.configuration.breakDuration = breakLength;
    this.configuration.additionalBreak = additionalBreak;
    this.configuration.longBreakInterval = longBreakInterval;
    this.configuration.autoPlay = autoPlay;

    if (this.currentState === 'break') {
      if (this.sessionCount === 0) {
        this.timer = this.configuration.breakDuration;
      } else if (
        this.sessionCount % this.configuration.longBreakInterval ===
        0
      ) {
        this.timer =
          +this.configuration.breakDuration +
          +this.configuration.additionalBreak;
      } else {
        this.timer = this.configuration.breakDuration;
      }
    } else if (this.currentState === 'session') {
      this.timer = this.configuration.sessionDuration;
    }
    this.configurationChange$.next();
    this.timerRestart();
  }

  onDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.timerClass.onDestroy();
  }
}
