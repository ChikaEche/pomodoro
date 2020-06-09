import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileUpdateService } from 'src/app/core/profile-update.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: User;
  profileState = 'manage-account';

  password = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    retypePassword: new FormControl('', [Validators.required]),
  });

  profile = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private profileUpdateService: ProfileUpdateService
  ) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        tap((user) => {
          this.userProfile = user;
          this.profile.setValue({
            name: this.userProfile.displayName,
            email: this.userProfile.email,
          });
        })
      )
      .subscribe({ error: (err) => console.warn('error occured') });
  }

  profileStateToggle(state: string) {
    if (state === 'manage-account') {
      this.profileState = 'manage-account';
    } else if (state === 'password-change') {
      this.profileState = 'password-change';
    }
  }

  updateName() {
    this.profileUpdateService.nameUpadate(this.profile.get('name').value);
  }
}
