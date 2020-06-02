import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from 'src/app/dashboard/task/task.component';
import { map, takeUntil, tap } from 'rxjs/operators';
import { TimeTrackerService } from './time-tracker.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskDialogService {
  taskPropagation$ = new Subject<void>();
  destroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    public timeTrackerService: TimeTrackerService
  ) {
    this.timeTrackerService.timerClass.countDownEnd$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          if (this.timeTrackerService.sessionCount % +this.session === 0) {
            this.session = 0;
            this.task = '';
            this.taskStop();
          }
        })
      )
      .subscribe({ error: (err) => console.error('error occured') });
  }
  task: string;
  session: number;

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '50vw',
      data: { task: this.task, session: this.session },
    });
    dialogRef
      .afterClosed()
      .pipe(
        map((result) => {
          if (result) {
            this.task = result[0];
            this.session = result[1];
            this.taskPropagation$.next();
          }
        })
      )
      .subscribe();
  }

  taskStop() {
    this.timeTrackerService.timerPause();
  }
}
