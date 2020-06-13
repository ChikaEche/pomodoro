import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  userId = '';
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    const { uid } = await this.authService.getCurrentUser();
    this.userId = uid;
  }

  async deletUser() {
    try {
      await this.afs.collection('users').doc(this.userId).delete();

      await this.afs.doc(`configuration/${this.userId}`).delete();
      await this.afs.doc(`user-tasks/${this.userId}`).delete();
      await this.afs.doc(`user-sessions/${this.userId}`).delete();
      // tslint:disable-next-line: no-unused-expression
      (await this.afAuth.currentUser).delete;
      this.afAuth.signOut();
      this.router.navigate(['']);
    } catch (error) {
      console.log('cannot delete user due to ', error);
    }
  }
}
