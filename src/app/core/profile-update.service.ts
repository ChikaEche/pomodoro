import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
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
    // tslint:disable-next-line: no-shadowed-variable
    private AuthService: AuthService,
    private router: Router
  ) {}

  nameUpadate(userName: string) {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: userName,
      })
      .then(() => '')
      .catch((error) => console.log('cannot update name'));
    const uid = firebase.auth().currentUser.uid;

    this.afs
      .collection('users')
      .doc(uid)
      .update({
        displayName: userName,
      })
      .then(() => alert('your name has been successfully updated'))
      .catch((error) => console.log('cannot upadte name'));
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
