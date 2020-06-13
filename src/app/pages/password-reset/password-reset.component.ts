import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProfileUpdateService } from 'src/app/core/services/profile-update.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  code = '';
  mode = '';
  passwordReset = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    retypePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  destroy$ = new Subject<void>();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileUpdateService: ProfileUpdateService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        takeUntil(this.destroy$),
        tap((params) => {
          if (!params.oobCode) {
            this.router.navigate(['']);
          }
          this.mode = params.mode;
          this.code = params.oobCode;
        })
      )
      .subscribe({ error: (err) => console.log('error occured') });
  }

  resetPassword() {
    this.afAuth
      .confirmPasswordReset(
        this.code,
        this.passwordReset.get('newPassword').value
      )
      .then(() => this.router.navigate(['login']))
      .catch((err) => console.log('cannot confirm password'));
  }

  confirmEmail() {
    firebase.auth().applyActionCode(this.code);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
