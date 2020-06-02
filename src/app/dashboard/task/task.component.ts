import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/cores/interface/dialog-data.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeTrackerService } from 'src/app/cores/services/time-tracker.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  constructor(
    public timeTrackerService: TimeTrackerService,
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  taskForm = new FormGroup({
    session: new FormControl('', [
      Validators.required,
      Validators.pattern('^[1-9][0-9]*$'),
    ]),
    task: new FormControl('', [Validators.required]),
  });

  onClose() {
    this.data.task = this.taskForm.get('task').value;
    this.data.sessionNumber = this.taskForm.get('session').value;
    this.dialogRef.close([this.data.task, this.data.sessionNumber]);
    this.timeTrackerService.timerRestart();
  }
}
