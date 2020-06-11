import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { sessionData, daysOfTheWeek } from 'src/app/shared/lib/sessionData';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class SessionUpdateService {
  days = daysOfTheWeek;
  userSession;
  session$: Observable<any>;
  dayOfTheWeek = new Date().getDay();
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.session$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        return this.afs.doc(`user-sessions/${user.uid}`).valueChanges();
      })
    );
    this.session$
      .pipe(tap((session) => (this.userSession = session)))
      .subscribe({ error: (err) => console.log('cannot get session') });
  }

  async updateSession(sessionCount: number) {
    const day = this.days[this.dayOfTheWeek];
    const uid = firebase.auth().currentUser.uid;
    this.userSession.weeklySession[`${day}`] = ++this.userSession.weeklySession[
      `${day}`
    ];
    try {
      await this.afs.doc(`user-sessions/${uid}`).set(this.userSession);
    } catch {
      console.log('cannot update session');
    }
  }

  async createSession(uid: string) {
    try {
      await this.afs.doc(`user-sessions/${uid}`).set(sessionData);
    } catch {
      console.log('cannot create session');
    }
  }

  checkExistingSession(uid: string) {
    this.afs
      .doc(`user-sessions/${uid}`)
      .valueChanges()
      .pipe(
        take(1),
        map((resp) => {
          if (!resp) {
            this.createSession(uid);
          }
        })
      )
      .subscribe({ error: (err) => console.log('cannot get session') });
  }
}
