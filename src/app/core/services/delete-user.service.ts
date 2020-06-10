import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  deletUser() {
    const uid = firebase.auth().currentUser.uid;
    this.afs
      .collection('users')
      .doc(uid)
      .delete()
      .then(() => alert('account succesfully deleted'))
      // tslint:disable-next-line: no-shadowed-variable
      .catch((error) => console.warn('cannot delete user', error));
    firebase.auth().currentUser.delete();
    this.afAuth.signOut();
    this.router.navigate(['']);
  }
}
