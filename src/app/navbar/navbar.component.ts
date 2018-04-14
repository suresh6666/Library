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
  searchBooks(searchText, cat, author) {
    this.route.navigate(['/search'], {queryParams: {q: searchText, author: author, category: cat}});
    this.searchForBook = '';
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
    this.authService.removeToken();
    this.route.navigate(['/welcome']);
  }
  getCartValues() {
    if (this.authService.isAuthenticated()) {
      const url = '?where=' + JSON.stringify({uId: this.userInfo['_id']});
      this.appService.getParse(this.appUrls.cart + url).subscribe((data) => {
        this.myCart = data['results'];
        this.appService.updateCart(this.myCart);
      });
    }
  }
}

