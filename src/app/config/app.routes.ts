import { Routes } from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {AuthenticationComponent} from '../authentication/authentication.component';
import {BookDetailsComponent} from '../book-details/book-details/book-details.component';
import {SearchbooksComponent} from '../searchbooks/searchbooks.component';
import {ProfileComponent} from '../profile/profile.component';
import {CheckoutComponent} from '../checkout/checkout.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'authentication', component: AuthenticationComponent },
  // Book Details Component
  { path: 'book_details/:book_name', component: BookDetailsComponent },
  { path: 'search', component: SearchbooksComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];
