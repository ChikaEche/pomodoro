import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { ProfileUpdateService } from 'src/app/core/profile-update.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  passwordLoginToggle = true;
  state;
  isSmall = false;
  formField = 'form-field';
  formFieldSmall = '';
  destroy$ = new Subject<void>();

  pswd = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  login = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: Router,
    private authService: AuthService,
    private breakPointService: BreakpointService,
    private profileUpdateService: ProfileUpdateService
  ) {
    this.breakPointService.isPalm$
      .pipe(
        takeUntil(this.destroy$),
        tap((x) => {
          this.isSmall = x;
          this.onScreenResize();
        })
      )
      .subscribe({ error: (err) => console.warn('on screen resize error') });
    this.state = this.route.getCurrentNavigation().extras.state;
    if (this.state === 'login') {
      this.state = 'login';
    } else if (this.state === 'sign up') {
      this.state = 'sign up';
    } else {
      this.state = 'login';
    }
  }

  ngOnInit(): void {}

  onScreenResize() {
    if (this.isSmall) {
      this.formFieldSmall = 'form-field-small';
      this.formField = '';
    } else {
      this.formField = 'form-field';
      this.formFieldSmall = '';
    }
  }

  passwordResetToggle() {
    this.passwordLoginToggle = !this.passwordLoginToggle;
  }

  stateToggle(state: string) {
    if (state === 'login') {
      this.state = 'login';
    } else {
      this.state = 'sign up';
    }
  }

  emailAndPasswordSignUp() {
    this.authService.emailAndPasswordSignUp(
      this.login.get('email').value,
      this.login.get('fullName').value,
      this.login.get('password').value
    );
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  logout() {
    this.authService.logout();
  }

  userLogin() {
    this.authService.login(
      this.login.get('email').value,
      this.login.get('password').value
    );
  }

  resetPassword() {
    this.profileUpdateService.passwordResetEmail(this.pswd.get('email').value);
    this.passwordLoginToggle = true;
  }
}
