import { Component, OnInit, OnDestroy } from '@angular/core';
import defaultConfiguration from '../../timer-config/default-config';
import { TimeTrackerService } from 'src/app/core/services/time-tracker.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Configuration } from 'src/app/shared/interfaces/configuration';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { CreateConfigService } from 'src/app/core/services/create-config.service';
import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  configUpdate: Configuration;
  uid = firebase.auth().currentUser.uid;
  defaultConfig = defaultConfiguration;
  autoPlay = this.defaultConfig.autoplay;
  destroy$ = new Subject<void>();

  validation = [Validators.required, Validators.pattern('^[1-9][0-9]*$')];
  settings = new FormGroup({
    sessionLength: new FormControl('', this.validation),
    breakLength: new FormControl('', this.validation),
    additionalBreak: new FormControl('', this.validation),
    longBreakInterval: new FormControl('', this.validation),
  });

  constructor(
    private readonly afs: AngularFirestore,
    private readonly createConfigService: CreateConfigService
  ) {}

  ngOnInit() {
    this.createConfigService.config$
      .pipe(
        takeUntil(this.destroy$),
        tap((config) => {
          this.settings.setValue({
            sessionLength: config.sessionTime / 60,
            breakLength: config.breakTime / 60,
            additionalBreak: config.additionalBreakTime / 60,
            longBreakInterval: config.longBreakInterval,
          });
          this.autoPlay = config.autoplay;
        })
      )
      .subscribe({ error: (err) => console.log('cannot get config') });
  }

  apply() {
    this.configUpdate = {
      sessionTime: this.settings.get('sessionLength').value * 60,
      breakTime: this.settings.get('breakLength').value * 60,
      longBreakInterval: +this.settings.get('longBreakInterval').value,
      autoplay: this.autoPlay,
      additionalBreakTime: this.settings.get('additionalBreak').value * 60,
    };
    this.afs
      .doc(`configurations/${this.uid}`)
      .set(this.configUpdate, { merge: true });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
