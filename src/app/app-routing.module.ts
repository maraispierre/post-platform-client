import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AccountHomePageComponent } from './components/account-home-page/account-home-page.component';
import { AuthGuard } from './services/auth-guard.service';
import { GuestGuard } from './services/guest-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: '',
    component: AccountHomePageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
