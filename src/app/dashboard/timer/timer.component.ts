import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeTrackerService } from 'src/app/core/services/time-tracker.service';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { TaskDialogService } from 'src/app/core/services/task-dialog.service';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  cardToggle = false;
  breakPoint$;
  currentTask = '';
  sessionCount = 0;
  breakCount = 0;
  toggle = true;
  animations = {
    animation: `blink ${0}s infinte alternate`,
  };
  startSound = new Howl({
    src: ['assets/tick.wav'],
  });

  alarmSound = new Howl({
    src: ['assets/alarm.mp3'],
  });

  constructor(
    public timeTrackerService: TimeTrackerService,
    private taskDialogService: TaskDialogService,
    private breakPointService: BreakpointService
  ) {
    this.breakPoint$ = this.breakPointService.isPalm$;
  }

  ngOnInit(): void {
    this.timeTrackerService.configurationChange$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.animations.animation = `blink ${0}s infinite alternate`;
          this.toggle = true;
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });

    this.timeTrackerService.timerClass.countDownEnd$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.currentTask = this.taskDialogService.task;
          this.alarmSound.play();
          if (!this.timeTrackerService.userConfig.autoplay) {
            this.toggle = true;
            this.animations.animation = `blink ${0}s infinite alternate`;
          }
          this.sessionCount = this.timeTrackerService.sessionCount;
          this.breakCount = this.timeTrackerService.breakCount;
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }

  pause() {
    this.alarmSound.stop();
    this.startSound.stop();
    this.animations.animation = `blink ${0}s infinite alternate`;
    this.toggle = true;
    this.timeTrackerService.timerPause();
  }

  start() {
    this.alarmSound.stop();
    this.startSound.play();
    this.animations.animation = `blink ${1}s infinite alternate`;
    this.toggle = false;
    this.timeTrackerService.timerStart();
  }

  restart() {
    this.animations.animation = `blink ${0}s infinite alternate`;
    this.toggle = true;
    this.timeTrackerService.timerRestart();
  }

  openDiaglog() {
    this.taskDialogService.openDialog();
    this.taskDialogService.taskPropagation$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.currentTask = this.taskDialogService.task;
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }

  toogleCard() {
    this.cardToggle = !this.cardToggle;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.timeTrackerService.timerClass.onDestroy();
  }
}
