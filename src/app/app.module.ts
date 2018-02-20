import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import {AppComponent} from './app.component';
import { routes } from './app.routes';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'universal-cli'}),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
