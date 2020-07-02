import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { ProfileUpdateService } from 'src/app/core/services/profile-update.service';
import { ErrorMessagesService } from 'src/app/core/services/error-messages.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  passwordLoginToggle = true;
  state;
  isSmall = false;
  formField = 'form-field';
  formFieldSmall = '';
  loginWrapNormal = 'login__wrap';
  loginWrapSmall = '';
  destroy$ = new Subject<void>();

  pswd = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  login = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private route: Router,
    private authService: AuthService,
    private breakPointService: BreakpointService,
    private profileUpdateService: ProfileUpdateService,
    private readonly errorMessageService: ErrorMessagesService
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

  ngOnInit() {}

  onScreenResize() {
    if (this.isSmall) {
      this.formFieldSmall = 'form-field-small';
      this.formField = '';
      this.loginWrapNormal = '';
      this.loginWrapSmall = 'login__wrap-small';
    } else {
      this.formField = 'form-field';
      this.formFieldSmall = '';
      this.loginWrapNormal = 'login__wrap';
      this.loginWrapSmall = '';
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
    this.errorMessageService.errorMessage(
      'A reset link has been sent to this email'
    );
    this.passwordLoginToggle = true;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
