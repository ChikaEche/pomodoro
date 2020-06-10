import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateService {
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  async nameUpadate(displayName: string) {
    try {
      const { uid } = await this.authService.getCurrentUser();
      const userRef = this.afs.collection('users').doc(uid).ref;
      await userRef.set({ displayName }, { merge: true });
    } catch (err) {
      // tell user that something went wrong :(
    }
  }

  passwordResetEmail(email: string) {
    this.afAuth.sendPasswordResetEmail(email);
  }

  passwordReset(code: string, password: string) {
    this.afAuth
      .confirmPasswordReset(code, password)
      .then(() => this.router.navigate(['/login']))
      .catch((err) => console.log('cannot confirm password'));
  }
}
