import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileUpdateService } from 'src/app/core/services/profile-update.service';
import { DeleteUserService } from 'src/app/core/services/delete-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: User;
  profileState = 'manage-account';

  userDelete = new FormGroup({
    reason: new FormControl('', [Validators.required]),
  });

  profile = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private profileUpdateService: ProfileUpdateService,
    private deleteUserService: DeleteUserService
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
    } else if (state === 'delete') {
      this.profileState = 'delete';
    }
  }

  updateName() {
    this.profileUpdateService.nameUpadate(this.profile.get('name').value);
  }

  deleteUser() {
    this.deleteUserService.deletUser();
  }
}
