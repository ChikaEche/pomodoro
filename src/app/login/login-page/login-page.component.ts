import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private route: Router) {
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
}
