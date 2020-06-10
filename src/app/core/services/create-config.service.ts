import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import defaultConfiguration from 'src/app/timer-config/default-config';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CreateConfigService {
  constructor(private readonly afs: AngularFirestore) {}

  async createConfig(uid: string) {
    try {
      await this.afs.doc(`configuration/${uid}`).set(defaultConfiguration);
    } catch {
      console.log('cannot create default config');
    }
  }

  checkExistingConfig(uid: string) {
    this.afs
      .doc(`configuration/${uid}`)
      .valueChanges()
      .pipe(
        take(1),
        map((res) => {
          if (!res) {
            this.createConfig(uid);
          }
        })
      )
      .subscribe();
  }
}
