import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimeTrackerService } from 'src/app/cores/services/time-tracker.service';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { TaskDialogService } from 'src/app/cores/services/task-dialog.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  sessionCount = 0;
  breakCount = 0;
  toggle = true;
  animations = {
    animation: `blink ${0}s infinte alternate`,
  };

  constructor(
    public timeTrackerService: TimeTrackerService,
    public taskDialogService: TaskDialogService
  ) {}

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
          if (!this.timeTrackerService.configuration.autoPlay) {
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
    this.animations.animation = `blink ${0}s infinite alternate`;
    this.toggle = true;
    this.timeTrackerService.timerPause();
  }

  start() {
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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.timeTrackerService.timerClass.onDestroy();
  }
}
