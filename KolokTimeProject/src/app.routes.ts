import { Routes } from '@angular/router';
import { Home } from './home';
import { Login } from './login';
import { Signup } from './signup';
import { tokenGestion } from './common/tokenSystem';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'signup', component: Signup },
  { path: 'home',   component: Home/*, canActivate: [tokenGestion] */},
  { path: '**',     component: Login },
];
