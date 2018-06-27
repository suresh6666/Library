import { Routes, CanActivate } from '@angular/router';
import {WelcomeComponent} from '../welcome/welcome.component';
import {BookDetailsComponent} from '../book-details/book-details/book-details.component';
import {SearchbooksComponent} from '../searchbooks/searchbooks.component';
import {CheckoutComponent} from '../checkout/checkout.component';
import {MycreditComponent} from '../mycredit/mycredit.component';
import {RegisterComponent} from '../register/register.component';

import {AuthGuardService as AuthGaurd} from '../shared/auth.service';
import {ProfileComponent} from '../profile/profile.component';
import {MembershipComponent} from '../profile/membership/membership.component';
import {SettingsComponent} from '../profile/settings/settings.component';
import {ShippingComponent} from '../profile/shipping/shipping.component';
import {LoginComponent} from '../login/login.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {OrdersComponent} from '../orders/orders.component';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {TransactionsComponent} from '../transactions/transactions.component';
import {MycartComponent} from '../mycart/mycart.component';
import {CategoriesComponent} from '../categories/categories.component';
import {AboutusComponent} from '../aboutus/aboutus.component';
import {QuickstartComponent} from '../quickstart/quickstart.component';
import {LibraryfeaturesComponent} from '../libraryfeatures/libraryfeatures.component';
import {ReadingschemesComponent} from '../readingschemes/readingschemes.component';
import {FaqsComponent} from '../faqs/faqs.component';
import {TalktomemberComponent} from '../talktomember/talktomember.component';
import {ContactusComponent} from '../contactus/contactus.component';
import {ReadingpromotionComponent} from '../readingpromotion/readingpromotion.component';
import {CorporatemembershipsComponent} from '../corporatememberships/corporatememberships.component';
import {BooksharingprogramComponent} from '../booksharingprogram/booksharingprogram.component';
import {RequestanybookComponent} from '../requestanybook/requestanybook.component';
import {PublicationcareComponent} from '../publicationcare/publicationcare.component';
import {BenifitsofreadingComponent} from '../benifitsofreading/benifitsofreading.component';
import {DeliverylocationsComponent} from '../deliverylocations/deliverylocations.component';
import {TermsconditionsComponent} from '../termsconditions/termsconditions.component';
import {PrivacypolicyComponent} from '../privacypolicy/privacypolicy.component';
import {TestimonialsComponent} from '../testimonials/testimonials.component';
import {ActivateemailComponent} from '../activateemail/activateemail.component';
import {ForgotpasswordactivationComponent} from '../forgotpasswordactivation/forgotpasswordactivation.component';

export const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'book_details/:book_name/:isbn', component: BookDetailsComponent},
  {path: 'register-now', component: RegisterComponent},
  {path: 'confirm_account/users/:user_id/confirm/:token', component: ActivateemailComponent},
  {path: 'forgot-password-activation/users/:user_id/confirm/:token', component: ForgotpasswordactivationComponent},
  {path: 'login-now', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'search', component: SearchbooksComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'quickstart', component: QuickstartComponent},
  {path: 'libraryfeatures', component: LibraryfeaturesComponent},
  {path: 'readingschemes', component: ReadingschemesComponent},
  {path: 'readingspromotionprogram', component: ReadingpromotionComponent},
  {path: 'corporatememberships', component: CorporatemembershipsComponent},
  {path: 'booksharingprogram', component: BooksharingprogramComponent},
  {path: 'requestanybook', component: RequestanybookComponent},
  {path: 'faq', component: FaqsComponent},
  {path: 'publicationcare', component: PublicationcareComponent},
  {path: 'talktomember', component: TalktomemberComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'membership', component: MembershipComponent},
  {path: 'benifitsofreading', component: BenifitsofreadingComponent},
  {path: 'deliverylocations', component: DeliverylocationsComponent},
  {path: 'termsconditions', component: TermsconditionsComponent},
  {path: 'privacypolicy', component: PrivacypolicyComponent},
  {path: 'testimonials', component: TestimonialsComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'mycredit', component: MycreditComponent},
  {path: 'order-details/:order_id', component: OrderDetailsComponent},
  {
    path: 'profile', component: ProfileComponent,
    children: [
      {path: '', redirectTo: 'settings', pathMatch: 'full'},
      {path: 'settings', component: SettingsComponent},
      {path: 'shipping', component: ShippingComponent},
      {path: 'change-password', component: ChangePasswordComponent},
      {path: 'my-orders', component: OrdersComponent}
    ]
  },
  {path: 'my-cart', component: MycartComponent},
  {path: 'my-transactions', component: TransactionsComponent},
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];


