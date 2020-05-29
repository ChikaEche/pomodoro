import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogData } from 'src/app/cores/interface/dialogData.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData
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
    this.dialogRef.close();
  }
}
