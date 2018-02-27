import { Routes } from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {AuthenticationComponent} from '../authentication/authentication.component';
import {BookDetailsComponent} from '../book-details/book-details/book-details.component';
import {SearchbooksComponent} from '../searchbooks/searchbooks.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'authentication', component: AuthenticationComponent },
  // Book Details Component
  { path: 'book_details/:book_name', component: BookDetailsComponent },
  { path: 'search', component: SearchbooksComponent },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];
