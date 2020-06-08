import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  canActivate,
} from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';

const redirectToLogin = () => redirectUnauthorizedTo(['']);
const redirectToProfile = () =>
  map((user) => (user ? ['dashboard', (user as any).uid] : true));
const onlyAllowSelf = (next) =>
  map((user) => (!!user && next.params.id === (user as any).uid) || ['']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard/:id',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    ...canActivate(redirectToLogin),
    data: {
      authGuardPipe: onlyAllowSelf,
    },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
