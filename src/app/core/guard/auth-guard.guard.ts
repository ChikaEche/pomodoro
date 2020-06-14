import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { ErrorMessagesService } from '../services/error-messages.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private errorMessage: ErrorMessagesService
  ) {}
  canActivate(): Observable<boolean> {
    if (!firebase.auth().currentUser) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => user.emailVerified),
      tap((emailVerfication) => {
        if (!emailVerfication) {
          this.errorMessage.errorMessage('please verify your email address');
          this.afAuth.signOut();
          this.router.navigate(['/login']);
        }
        return emailVerfication;
      })
    );
  }
}
