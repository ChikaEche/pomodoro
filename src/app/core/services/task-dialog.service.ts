import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from 'src/app/dashboard/task/task.component';
import { map, takeUntil, tap, take } from 'rxjs/operators';
import { TimeTrackerService } from './time-tracker.service';
import { Subject } from 'rxjs';
import { TaskCreationService } from './task-creation.service';
@Injectable({
  providedIn: 'root',
})
export class TaskDialogService {
  taskPropagation$ = new Subject<void>();
  destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    public timeTrackerService: TimeTrackerService,
    public readonly taskCreationService: TaskCreationService
  ) {
    this.timeTrackerService.timerClass.countDownEnd$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          if (this.task !== '') {
            if (this.timeTrackerService.sessionCount % +this.session === 0) {
              const sessionCompleted = this.timeTrackerService.sessionCount;
              this.taskCreationService.updateTask(this.task);
              this.session = 0;
              this.task = '';
              this.taskStop(sessionCompleted);
            } else {
              this.taskCreationService.updateTask(this.task);
            }
          }
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }
  task = '';
  session: number;

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '50vw',
      data: { task: this.task, session: this.session },
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        map((result) => {
          if (result) {
            this.task = result[0];
            this.session = result[1];
            this.taskPropagation$.next();
            this.timeTrackerService.onDialogOpen();
            this.taskCreationService.checkExistingTask(this.task);
          }
        })
      )
      .subscribe();
  }

  taskStop(sessionCompleted: number) {
    this.timeTrackerService.timerPause();
  }
}
