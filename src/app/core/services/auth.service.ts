import { Injectable, NgZone } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { UserRole } from 'src/app/shared/enums/user-role.enum';

@Injectable()
export class AuthService {
  readonly user$: Observable<User>;

  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone, // TODO -> call ngZone later to remove console warnings
    public readonly afAuth: AngularFireAuth,
    private readonly afStore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        return user
          ? this.afStore.doc<User>(`users/${user.uid}`).valueChanges()
          : of(null);
      })
    );
  }

  /**
   * TODO -> look for compromise for browswers that
   * block this method out by default
   */
  googleLogin() {
    from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .pipe(switchMap(({ user }) => this.refreshUserData(user)))
      .subscribe({ error: (err) => console.error(err) });
  }

  logout() {
    from(this.afAuth.signOut)
      .pipe(tap(() => this.router.navigateByUrl('/')))
      .subscribe({ error: (err) => console.error(err) });
  }

  refreshUserData({
    uid,
    email,
    photoURL,
    displayName,
    roles,
  }: User): Observable<void> {
    const userDoc: AngularFirestoreDocument<User> = this.afStore.doc(
      `users/${uid}`
    );
    return from(
      userDoc.set(
        {
          uid,
          email,
          photoURL,
          displayName,
          roles: roles && roles.length ? roles : [UserRole.User],
        },
        { merge: true }
      )
    );
  }
}
