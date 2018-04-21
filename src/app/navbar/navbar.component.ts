import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import 'rxjs/add/observable/of';

import {ActivatedRoute, Router} from '@angular/router';
import {FilterArray} from '../shared/app.pipes';
import {AuthService} from '../shared/auth.service';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [FilterArray]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  searchForBook: string;
  showVar: boolean;
  userInfo: any = {email: null};
  myCart: any = [];
  @ViewChild('cart', {read: ElementRef}) cart: ElementRef;
  constructor(private route: Router,
              public authService: AuthService,
              private appService: AppService,
              private appUrls: AppUrls) {
    this.showVar = false;
  }
  searchBooks(searchText, cat, author, event?: any) {
    if (!event || event.keyCode === 13) {
      this.route.navigate(['/search'], {queryParams: {q: searchText, author: author, category: cat}});
      this.searchForBook = '';
    }
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.getUser();
      this.appService.cartCast.subscribe((data) => {
        console.log('myCast data', data);
        this.myCart = data;
      }, (error) => {
        console.log(error);
      });
      this.getCartValues();
    }
  }
  ngAfterViewInit() {}
  getUser() {
    this.userInfo = this.authService.getUser();
  }
  logout() {
    const lToken = this.authService.getToken('access_token');
    this.appService.get(this.appUrls.logout, {login_token: lToken}).then((success) => {
      this.authService.removeToken();
      this.route.navigate(['/welcome']);
      this.appService.toast('Successfully logged out', '', 's');
    }).catch((err) => {
      console.log(err);
    });
  }
  getCartValues() {
    if (this.authService.isAuthenticated()) {
      const myQuery = {
        where: {user_id: this.userInfo['_id']},
        embedded: {book: 1}
      };
      this.appService.get(this.appUrls.cart, myQuery).then((data) => {
        console.log('Cart items: ', data['_items']);
        this.myCart = data['_items'];
        this.appService.updateCart(this.myCart);
      });
    }
  }
}

