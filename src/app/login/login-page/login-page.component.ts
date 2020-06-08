import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  state;

  login = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private route: Router, private authService: AuthService) {
    this.state = this.route.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {}

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
}
