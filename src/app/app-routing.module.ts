import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { AuthGuardGuard } from './core/guard/auth-guard.guard';
import { map } from 'rxjs/operators';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';

const redirectToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectToProfile = () => map((user) => (user ? ['dashboard'] : true));

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    ...canActivate(redirectToLogin),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectToProfile,
    },
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
