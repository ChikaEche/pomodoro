import { Injectable } from '@angular/core';
import { Timer } from 'src/app/shared/lib/timer';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { CreateConfigService } from './create-config.service';
import { Configuration } from 'src/app/shared/interfaces/configuration';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  uid = firebase.auth().currentUser.uid;
  timerClass: Timer;
  statistics$ = new Subject<number[]>();
  destroy$ = new Subject<void>();
  configurationChange$ = new Subject<void>();
  userConfig: Configuration;
  sessionCount = 0;
  breakCount = 0;
  timer = 0;
  currentState = 'session';

  constructor(
    private readonly afs: AngularFirestore,
    private readonly createConfigService: CreateConfigService
  ) {
    this.createConfigService.config$
      .pipe(
        tap((config) => {
          this.userConfig = config;
          this.timer = this.userConfig.sessionTime;
          this.timerClass.seconds = this.timer;
        })
      )
      .subscribe({ error: (err) => console.log('cannot get config') });

    this.timerClass = new Timer();
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
      this.timer = this.userConfig.sessionTime;
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
