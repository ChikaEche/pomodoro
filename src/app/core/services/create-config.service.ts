import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import defaultConfiguration from 'src/app/timer-config/default-config';
import { map, take, switchMap } from 'rxjs/operators';
import { Configuration } from 'src/app/shared/interfaces/configuration';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CreateConfigService {
  config$: Observable<Configuration>;
  constructor(
    private readonly afs: AngularFirestore,
    private readonly afAuth: AngularFireAuth
  ) {
    this.config$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        return this.afs
          .doc<Configuration>(`configurations/${user.uid}`)
          .valueChanges();
      })
    );
  }

  async createConfig(uid: string) {
    const defaultConfig = defaultConfiguration;
    defaultConfig.userId = uid;
    try {
      await this.afs.doc(`configurations/${uid}`).set(defaultConfiguration);
    } catch {
      console.log('cannot create default config');
    }
  }

  checkExistingConfig(uid: string) {
    this.afs
      .doc(`configurations/${uid}`)
      .valueChanges()
      .pipe(
        take(1),
        map((res) => {
          if (!res) {
            this.createConfig(uid);
          }
        })
      )
      .subscribe({ error: (err) => console.log('cannot check for config') });
  }
}
