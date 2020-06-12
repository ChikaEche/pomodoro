import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { TaskData } from 'src/app/shared/interfaces/task-data';
import { tap, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskCreationService {
  userId = '';
  taskState: string;
  newTask = {};
  addedTask;
  taskExistence;
  tasks$: Observable<TaskData>;
  currentTask;
  constructor(
    private readonly afs: AngularFirestore,
    private readonly afAuth: AngularFireAuth,
    private readonly authService: AuthService
  ) {
    this.getUserId();
  }

  async createTask(task: string) {
    this.newTask[`${task}`] = {
      task: `${task}`,
    };
    console.log(this.newTask);
    try {
      this.afs
        .collection('user-tasks')
        .doc(`${this.userId}`)
        .set(this.newTask, { merge: true });
    } catch (error) {
      console.log('cannot create task', error);
    }
  }

  async getUserId() {
    const { uid } = await this.authService.getCurrentUser();
    this.userId = uid;
  }

  async updateTask(task: string, sessionCount: number) {
    console.log(task);
    try {
      this.newTask[`${task}`]['sessionsCompleted'] = sessionCount;
      this.afs
        .doc(`user-tasks/${this.userId}`)
        .set(this.newTask, { merge: true });
      console.log(this.newTask);
      this.newTask[`${task}`] = {
        task: `${task}`,
      };
    } catch {
      console.log('cannot update task', this.newTask);
    }
  }
}
