import { Injectable, NgZone } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap, tap, first, take } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { UserRole } from 'src/app/shared/enums/user-role.enum';
import { CreateConfigService } from './create-config.service';
import { SessionUpdateService } from './session-update.service';
import { ErrorMessagesService } from './error-messages.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user$: Observable<User>;

  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone, // TODO -> call ngZone later to remove console warnings
    public readonly afAuth: AngularFireAuth,
    private readonly afStore: AngularFirestore,
    private readonly createConfigService: CreateConfigService,
    private readonly sessionUpdateService: SessionUpdateService,
    private readonly errorMessageService: ErrorMessagesService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        return user
          ? this.afStore.doc<User>(`users/${user.uid}`).valueChanges()
          : of(null);
      })
    );
  }

  getCurrentUser(): Promise<User> {
    return this.user$.pipe(first()).toPromise();
  }

  async emailAndPasswordSignUp(email: string, name: string, password: string) {
    try {
      let resp;
      resp = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await resp.user.updateProfile({ displayName: `${name}` });
      this.refreshUserData(resp.user);
      const uid = resp.user.uid;
      this.createConfigService.createConfig(uid);
      this.sessionUpdateService.createSession(uid);
      (await this.afAuth.currentUser).sendEmailVerification();
      this.errorMessageService.errorMessage(
        'Email link for verification has been sent to this email'
      );
      this.afAuth.signOut();
    } catch (error) {
      this.errorMessageService.errorMessage(error.message);
      console.log(error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      let resp;
      resp = await this.afAuth.signInWithEmailAndPassword(email, password);
      const uid = resp.user.uid;
      this.refreshUserData(resp.user);
      this.createConfigService.checkExistingConfig(uid);
      this.sessionUpdateService.checkExistingSession(uid);
      this.router.navigate(['/dashboard']);
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.log(error.message);
      this.errorMessageService.errorMessage('Incorrect password or email');
    }
  }

  googleLogin() {
    from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
      .pipe(
        take(1),
        switchMap(({ user }) => {
          this.createConfigService.checkExistingConfig(user.uid);
          this.sessionUpdateService.checkExistingSession(user.uid);
          this.router.navigate(['/dashboard']);
          setTimeout(() => window.location.reload(), 1000);
          return this.refreshUserData(user);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorMessageService.errorMessage(
            'There was an error signing in with google'
          );
        },
      });
  }

  logout() {
    from(this.afAuth.signOut())
      .pipe(tap(() => this.router.navigateByUrl('/')))
      .subscribe({ error: (err) => console.error(err) });
  }

  refreshUserData(user) {
    const userDoc: AngularFirestoreDocument<User> = this.afStore.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      roles: [UserRole.User],
    };
    if (user.photoURL) {
      // tslint:disable-next-line: no-string-literal
      data['photoURL'] = user.photoURL;
    }
    return userDoc.set(data, { merge: true });
  }
}
