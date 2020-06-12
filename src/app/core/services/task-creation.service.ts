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
      userId: `${this.userId}`,
      sessionsCompleted: 0,
    };
    try {
      this.afs
        .collection('user-tasks')
        .doc(`${this.userId}`)
        .set(this.newTask, { merge: true });
    } catch (error) {
      console.log('cannot create task', error);
    }
    this.getCurrentTask(task);
  }

  async getUserId() {
    const { uid } = await this.authService.getCurrentUser();
    this.userId = uid;
  }

  checkExistingTask(task: string) {
    this.afs
      .collection('user-tasks', (ref) =>
        ref
          .where(`${task}.userId`, '==', `${this.userId}`)
          .where(`${task}.task`, '==', `${task}`)
      )
      .valueChanges()
      .pipe(
        take(1),
        map((resp) => {
          if (resp.length === 0) {
            this.createTask(task);
          } else {
            this.getCurrentTask(task);
          }
        })
      )
      .subscribe({ error: (err) => console.log('cannot get current task') });
  }

  getCurrentTask(task: string) {
    this.afs
      .collection('user-tasks', (ref) =>
        ref
          .where(`${task}.userId`, '==', `${this.userId}`)
          .where(`${task}.task`, '==', `${task}`)
      )
      .valueChanges()
      .pipe(
        take(1),
        map((resp) => {
          console.log(resp);
          this.currentTask = resp;
        })
      )
      .subscribe({ error: (err) => console.log('cannot get current task') });
  }

  /**taskSessionTracker(task: string, sessionCount: number) {
      sessionCount = sessionCount / 2;
      sessionCount = Math.floor(sessionCount);
      if(sessionCount === 0) {
        sessionCount = sessionCount + 1;
      }
      this.updateTask(task, sessionCount);
  }
  **/

  async updateTask(task: string) {
    console.log(this.currentTask);
    this.addedTask = this.currentTask[0];
    console.log(this.addedTask);
    try {
      if (!this.addedTask[`${task}`]['sessionsCompleted']) {
        this.addedTask[`${task}`]['sessionsCompleted'] = 1;
        console.log(this.addedTask[`${task}`]['sessionsCompleted']);
      } else if (this.addedTask[`${task}`]['sessionsCompleted']) {
        this.addedTask[`${task}`]['sessionsCompleted'] = ++this.addedTask[
          `${task}`
        ]['sessionsCompleted'];
        console.log(this.addedTask[`${task}`]['sessionsCompleted']);
      }
      this.afs
        .doc(`user-tasks/${this.userId}`)
        .set(this.addedTask, { merge: true });
      console.log(this.addedTask);
    } catch {
      console.log('cannot update task', this.addedTask);
    }
  }
}
