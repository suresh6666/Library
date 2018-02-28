import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import { routes } from './config/app.routes';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FooterComponent } from './footer/footer.component';
import {TypeaheadModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { SearchbooksComponent } from './searchbooks/searchbooks.component';
import { ProfileComponent } from './profile/profile.component';
import {AppService} from './shared/app.service';
import {AppUrls} from './shared/app.constants';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    AuthenticationComponent,
    FooterComponent,
    BookDetailsComponent,
    SearchbooksComponent,
    ProfileComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    BrowserModule.withServerTransition({appId: 'universal-cli'}),
    RouterModule.forRoot(routes)
  ],
  providers: [AppService, AppUrls],
  bootstrap: [AppComponent]
})
export class AppModule {
}