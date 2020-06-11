import { Injectable } from '@angular/core';
import { Timer } from 'src/app/shared/lib/timer';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CreateConfigService } from './create-config.service';
import { Configuration } from 'src/app/shared/interfaces/configuration';
import { SessionUpdateService } from './session-update.service';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  timerClass: Timer;
  statistics$ = new Subject<number[]>();
  destroy$ = new Subject<void>();
  configurationChange$ = new Subject<void>();
  userConfig: Configuration;
  sessionCount = 0;
  breakCount = 0;
  timer = 0;
  currentState = 'session';
  initialAssignment = 'initial';

  constructor(
    private readonly sessionUpdateService: SessionUpdateService,
    private readonly createConfigService: CreateConfigService
  ) {
    this.createConfigService.config$
      .pipe(
        tap((config) => {
          this.userConfig = config;
          if (this.initialAssignment === 'initial') {
            this.timer = this.userConfig.sessionTime;
            this.timerClass.seconds = this.timer;
          }
          this.initialAssignment = 'assigned';
          this.configChange();
        })
      )
      .subscribe({ error: (err) => console.log('cannot get config') });

    this.timerClass = new Timer();
    this.timerClass.countDownEnd$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.stateToggle();
          this.statistics$.next([this.sessionCount, this.breakCount]);
          this.sessionUpdateService.updateSession(this.sessionCount);
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }

  timerStart() {
    this.timerClass.start();
  }

  stateToggle() {
    if (this.currentState === 'session') {
      ++this.sessionCount;
      if (this.sessionCount % this.userConfig.longBreakInterval === 0) {
        this.timer =
          this.userConfig.breakTime + this.userConfig.additionalBreakTime;
        this.timerClass.seconds = this.timer;
      } else {
        this.timer = this.userConfig.breakTime;
        this.timerClass.seconds = this.timer;
      }
      this.currentState = 'break';
    } else if (this.currentState === 'break') {
      ++this.breakCount;
      this.timer = this.userConfig.sessionTime;
      this.timerClass.seconds = this.timer;
      this.currentState = 'session';
    }
    // tslint:disable-next-line: no-unused-expression
    this.userConfig.autoplay ? this.timerStart() : '';
  }

  timerPause() {
    this.timerClass.pause();
    this.configurationChange$.next();
  }

  timerRestart() {
    this.timerClass.seconds = this.timer;
    this.timerPause();
  }

  configChange() {
    console.log(this.currentState);
    if (this.currentState === 'break') {
      if (this.sessionCount === 0) {
        this.timer = this.userConfig.breakTime;
      } else if (this.sessionCount % this.userConfig.longBreakInterval === 0) {
        this.timer =
          +this.userConfig.breakTime + +this.userConfig.additionalBreakTime;
      } else {
        this.timer = this.userConfig.breakTime;
      }
    } else if (this.currentState === 'session') {
      console.log(this.userConfig.sessionTime);
      this.timer = this.userConfig.sessionTime;
      console.log(this.timer);
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
