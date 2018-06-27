import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import { routes } from './config/app.routes';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import {AppService} from './shared/app.service';
import {AppConstants, AppUrls} from './shared/app.constants';
import {FilterArray} from './shared/app.pipes';
import { CheckoutComponent } from './checkout/checkout.component';
import { MycreditComponent } from './mycredit/mycredit.component';
import {AuthGuardService, AuthService} from './shared/auth.service';
import { RegisterComponent } from './register/register.component';
import { MembershipComponent } from './profile/membership/membership.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { ShippingComponent } from './profile/shipping/shipping.component';
import {ProfileComponent} from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentComponent } from './payment/payment.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MycartComponent } from './mycart/mycart.component';
import { CategoriesComponent } from './categories/categories.component';
import {FilterPipe} from './app.pipe';
import { AboutusComponent } from './aboutus/aboutus.component';
import { QuickstartComponent } from './quickstart/quickstart.component';
import { LibraryfeaturesComponent } from './libraryfeatures/libraryfeatures.component';
import { ReadingschemesComponent } from './readingschemes/readingschemes.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TalktomemberComponent } from './talktomember/talktomember.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ReadingpromotionComponent } from './readingpromotion/readingpromotion.component';
import { CorporatemembershipsComponent } from './corporatememberships/corporatememberships.component';
import { BooksharingprogramComponent } from './booksharingprogram/booksharingprogram.component';
import { RequestanybookComponent } from './requestanybook/requestanybook.component';
import { PublicationcareComponent } from './publicationcare/publicationcare.component';
import { BenifitsofreadingComponent } from './benifitsofreading/benifitsofreading.component';
import { DeliverylocationsComponent } from './deliverylocations/deliverylocations.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsconditionsComponent } from './termsconditions/termsconditions.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ActivateemailComponent } from './activateemail/activateemail.component';
import { ForgotpasswordactivationComponent } from './forgotpasswordactivation/forgotpasswordactivation.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    FooterComponent,
    BookDetailsComponent,
    SearchbooksComponent,
    FilterArray,
    CheckoutComponent,
    MycreditComponent,
    RegisterComponent,
    ProfileComponent,
    MembershipComponent,
    SettingsComponent,
    ShippingComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    OrderDetailsComponent,
    OrdersComponent,
    PaymentComponent,
    TransactionsComponent,
    MycartComponent,
    CategoriesComponent,
    FilterPipe,
    AboutusComponent,
    QuickstartComponent,
    LibraryfeaturesComponent,
    ReadingschemesComponent,
    FaqsComponent,
    TalktomemberComponent,
    ContactusComponent,
    ReadingpromotionComponent,
    CorporatemembershipsComponent,
    BooksharingprogramComponent,
    RequestanybookComponent,
    PublicationcareComponent,
    BenifitsofreadingComponent,
    DeliverylocationsComponent,
    PrivacypolicyComponent,
    TermsconditionsComponent,
    TestimonialsComponent,
    ActivateemailComponent,
    ForgotpasswordactivationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'universal-cli'}),
    RouterModule.forRoot(routes)
  ],
  providers: [AppService, AppUrls, AppConstants, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
