import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointService } from '../../../core/services/breakpoint.service';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ErrorMessagesService } from 'src/app/core/services/error-messages.service';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  breakPoint$: Observable<boolean>;
  userProfile;
  errorMessage = '';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  destroy$ = new Subject<void>();
  constructor(
    private breakPointService: BreakpointService,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private readonly errorMessageService: ErrorMessagesService
  ) {
    this.breakPoint$ = this.breakPointService.isPalm$;
  }

  logOut() {
    this.authService.logout();
    setTimeout(() => window.location.reload(), 500);
  }

  ngOnInit(): void {
    this.errorMessageService.error$
      .pipe(
        takeUntil(this.destroy$),
        tap((message) => {
          this.errorMessage = message;
          this.openSnackBar(message);
        })
      )
      .subscribe({ error: (err) => console.log(err) });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
