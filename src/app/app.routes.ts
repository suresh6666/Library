import { Routes } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthenticationComponent} from './authentication/authentication.component';

export const routes: Routes = [
  { path: 'landing', component: WelcomeComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  }
];
