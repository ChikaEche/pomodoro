import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, map, switchMap, tap } from 'rxjs/operators';
import {
  weeklySessionData,
  daysOfTheWeek,
  monthsOfTheYear,
} from 'src/app/shared/lib/sessionData';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class SessionUpdateService {
  days = daysOfTheWeek;
  months = monthsOfTheYear;
  userSession;
  session$: Observable<any>;
  actualDayOfTheWeek = new Date().getDay();
  actualMonthOfTheYear = new Date().getMonth();
  userId = '';

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.session$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.userId = user.uid;
          return this.afs.doc(`user-sessions/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

    this.session$
      .pipe(
        take(1),
        tap((session) => {
          this.userSession = session;
        })
      )
      .subscribe({ error: (err) => console.log('cannot get session', err) });
  }

  async updateSession(sessionCount: number) {
    const day = this.days[this.actualDayOfTheWeek];
    const month = this.months[this.actualMonthOfTheYear];
    this.userSession.weeklySession[`${day}`] = ++this.userSession.weeklySession[
      `${day}`
    ];
    this.userSession.monthlySession[`${month}`] = ++this.userSession
      .monthlySession[`${month}`];
    try {
      await this.afs
        .doc(`user-sessions/${this.userId}`)
        .set(this.userSession, { merge: true });
    } catch (error) {
      console.log('cannot update session', error);
    }
  }

  async createSession(uid: string) {
    weeklySessionData.userId = uid;
    try {
      await this.afs
        .doc(`user-sessions/${uid}`)
        .set(weeklySessionData, { merge: true });
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
      .subscribe({ error: (err) => console.log('cannot get session', err) });
  }
}
