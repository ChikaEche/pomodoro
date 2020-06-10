import { Component, OnInit } from '@angular/core';
import defaultConfiguration from '../../timer-config/default-config';
import { TimeTrackerService } from 'src/app/core/services/time-tracker.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Configuration } from 'src/app/shared/interfaces/configuration';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { CreateConfigService } from 'src/app/core/services/create-config.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  Userconfig: Configuration;
  configUpdate: Configuration;
  uid = firebase.auth().currentUser.uid;
  defaultConfig = defaultConfiguration;
  autoPlay = this.defaultConfig.autoplay;

  validation = [Validators.required, Validators.pattern('^[1-9][0-9]*$')];
  settings = new FormGroup({
    sessionLength: new FormControl(
      this.defaultConfig.sessionTime / 60,
      this.validation
    ),
    breakLength: new FormControl(
      this.defaultConfig.breakTime / 60,
      this.validation
    ),
    additionalBreak: new FormControl(
      this.defaultConfig.additionalBreakTime / 60,
      this.validation
    ),
    longBreakInterval: new FormControl(
      this.defaultConfig.longBreakInterval,
      this.validation
    ),
  });

  constructor(
    private timeTrackerService: TimeTrackerService,
    private readonly afs: AngularFirestore,
    private readonly createConfigService: CreateConfigService
  ) {
    this.createConfigService.config$
      .pipe(
        tap((config) => {
          console.log(config);
          this.Userconfig = config;
        })
      )
      .subscribe({ error: (err) => console.log('cannot get config') });
  }

  ngOnInit() {}

  apply() {
    this.timeTrackerService.configChange(
      this.settings.get('sessionLength').value * 60,
      this.settings.get('breakLength').value * 60,
      this.settings.get('additionalBreak').value * 60,
      this.settings.get('longBreakInterval').value,
      this.defaultConfig.autoplay
    );
    this.configUpdate = {
      sessionTime: this.settings.get('sessionLength').value * 60,
      breakTime: this.settings.get('breakLength').value * 60,
      longBreakInterval: this.settings.get('longBreakInterval').value,
      autoplay: this.autoPlay,
      additionalBreakTime: this.settings.get('additionalBreak').value * 60,
    };
    this.afs.doc(`configuration/${this.uid}`).set(this.configUpdate);
  }
}
