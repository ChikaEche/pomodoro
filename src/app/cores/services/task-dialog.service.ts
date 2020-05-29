import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from 'src/app/dashboard/task/task.component';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TaskDialogService {
  task: string;
  session: number;
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '50vw',
      data: { task: this.task, session: this.session },
    });
    dialogRef
      .afterClosed()
      .pipe(map((result) => console.log(result)))
      .subscribe();
  }
}
