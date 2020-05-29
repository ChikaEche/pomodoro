import { Injectable } from '@angular/core';
import { Timer } from 'src/app/shared/timer';
import { tap, takeUntil } from 'rxjs/operators';
import Configuration from 'src/app/configurations/default-config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  public timerClass: Timer;
  destroy$ = new Subject<void>();
  configurationChange$ = new Subject();
  sessionDuration = Configuration.sessionTime;
  breakDuration = Configuration.breakTime;
  additionalBreak = Configuration.additionalBreakTime;
  longBreakInterval = Configuration.longBreakInterval;
  autoPlay = Configuration.autoplay;
  sessionCount = 1;
  breakCount = 0;
  timer = 0;
  currentState = 'session';

  constructor() {
    this.timerClass = new Timer();
    this.timer = this.sessionDuration;
    this.timerClass.seconds = this.timer;
    this.timerClass.countDownEnd$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.stateToggle())
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }

  timerStart() {
    this.timerClass.start();
  }

  stateToggle() {
    if (this.currentState === 'session') {
      this.sessionCount++;
      if (this.sessionCount % this.longBreakInterval === 0) {
        this.timer = this.breakDuration + this.additionalBreak;
        this.timerClass.seconds = this.timer;
      } else {
        this.timer = this.breakDuration;
        this.timerClass.seconds = this.timer;
      }
      this.currentState = 'break';
    } else if (this.currentState === 'break') {
      ++this.breakCount;
      this.timer = this.sessionDuration;
      this.timerClass.seconds = this.timer;
      this.currentState = 'session';
    }
    this.autoPlay ? this.timerStart() : '';
  }

  timerPause() {
    this.timerClass.pause();
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
    console.log(this.currentState);
    this.sessionDuration = session;
    this.breakDuration = breakLength;
    this.additionalBreak = additionalBreak;
    this.longBreakInterval = longBreakInterval;
    this.autoPlay = autoPlay;
    console.log(session);
    if (this.currentState === 'break') {
      if (this.sessionCount % this.longBreakInterval === 0) {
        this.timer = +this.breakDuration + +this.additionalBreak;
        console.log(this.timer);
      } else {
        this.timer = this.breakDuration;
      }
    } else if (this.currentState === 'session') {
      this.timer = this.sessionDuration;
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
