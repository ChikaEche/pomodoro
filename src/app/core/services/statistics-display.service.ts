import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatisticsDisplayService {
  userId = '';
  tasks$: Observable<any>;
  constructor(
    private readonly afs: AngularFirestore,
    private readonly afAuth: AngularFireAuth
  ) {
    this.tasks$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        return this.afs.doc(`user-tasks/${user.uid}`).valueChanges();
      })
    );
  }
}
