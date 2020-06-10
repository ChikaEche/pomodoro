import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointService } from '../../../core/services/breakpoint.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  breakPoint$: Observable<boolean>;
  userProfile;
  constructor(
    private breakPointService: BreakpointService,
    public afAuth: AngularFireAuth,
    public authService: AuthService
  ) {
    this.breakPoint$ = this.breakPointService.isPalm$;
  }

  logOut() {
    this.authService.logout();
    setTimeout(() => window.location.reload(), 500);
  }

  ngOnInit(): void {}
}
